import {
  _setAccessTokenAndClear,
  ConnectionSourceType,
  getAccessToken,
  GLOBAL_JUMPER_MESSAGES,
  globalContext,
  ImageByAspectRatio,
  jumper,
  OAuthIframe,
  OAuthResponse,
  React,
  useHandleTruffleOAuth,
  useStyleSheet,
} from "../../../deps.ts";
import { Page, usePageStack } from "../../page-stack/mod.ts";
import ChatSettingsPage from "../chat-settings-page/chat-settings-page.tsx";

import stylesheet from "./oauth-connection-page.scss.js";

export default function OAuthConnectionPage(
  { sourceType = "youtube" }: { sourceType: ConnectionSourceType },
) {
  useStyleSheet(stylesheet);

  return (
    <Page isFullSize shouldDisableEscape shouldShowHeader={false}>
      <div className="c-oauth-connection-page">
        <ImageByAspectRatio
          imageUrl="https://cdn.bio/assets/images/features/browser_extension/extension-onboarding.png"
          widthPx={576}
          height={300}
        />
        <div className="info">
          Connect your YouTube account to share your name and channel ID to start earning channel
          points, unlocking rewards, and participating in polls and predictions through Truffle.
        </div>
        <OAuthButton sourceType={sourceType} />
        <a
          className="policies mm-text-link"
          target={"_blank"}
          href={"https://truffle.vip/policies"}
          rel="noreferrer"
        >
          Privacy Policies
        </a>
      </div>
    </Page>
  );
}

function OAuthButton(
  { sourceType = "youtube" }: {
    sourceType: ConnectionSourceType;
  },
) {
  const { clearPageStack, pushPage, popPage } = usePageStack();

  const onSetAccessToken = (oauthResponse: OAuthResponse) => {
    popPage();
    _setAccessTokenAndClear(oauthResponse.truffleAccessToken);

    // let other embeds know that the user has changed and they need to
    // reset their api client and cache
    jumper.call("comms.postMessage", GLOBAL_JUMPER_MESSAGES.ACCESS_TOKEN_UPDATED);

    pushPage(
      <ChatSettingsPage
        onContinue={clearPageStack}
      />,
    );
  };

  // listens for a post message from the OAuthIframe component
  // and call onSetAccessToken when a user logs in using a 3rd party connection
  // and the user's truffle access token is returned
  useHandleTruffleOAuth(onSetAccessToken);

  const accessToken = getAccessToken();
  const context = globalContext.getStore();
  const orgId = context?.orgId;

  return (
    <OAuthIframe
      sourceType={sourceType}
      accessToken={accessToken}
      orgId={orgId}
      styles={{
        width: "148px",
        height: "42px",
        margin: "20px auto",
        border: "none",
      }}
    />
  );
}
