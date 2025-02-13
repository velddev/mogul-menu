import { scss } from "../../deps.ts";

export default scss`
.c-tile {
  background: red;
  $border-radius: 6px;
  $tile-bg: var(--mm-color-bg-secondary);
  min-width: 0;

  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  min-height: 157px;
  background-color: $tile-bg;
  border: 1px solid var(--mm-color-bg-tertiary);
  transition: filter linear 100ms;
  position: relative;

  &.clickable:hover {
    filter: brightness(80%);
    cursor: pointer;
  }

  >.header {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 24px 8px 0 16px;
    height: 44px;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    box-sizing: border-box;
    margin-bottom: 20px;

    >.icon {
      background-color: var(--mm-color-bg-primary);
      border-radius: 100%;
      width: 40px;
      height: 40px;
      border-width: 1px;
      border-style: solid;

      >div {
        margin: auto;
      }
    }

    >.text {
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: black;
    }
  }
}
`;
