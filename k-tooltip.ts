/** @todo This needs to be checked for accessibility. */
export class IngTooltip extends HTMLElement {
  css = `
    :host {
      --background-color: #333333;
    }

    /* https://developer.chrome.com/blog/anchor-positioning-api */

    [popover] {
      /* Positioning */
      inset-area: bottom;
      position-anchor: --invoker-anchor;
      margin-top: 12px;

      /* Make it look like a tooltip */
      max-width: 300px;
      border-radius: 15px;
      padding: 5px 10px;

      color: white;
      border: 0;

      background: var(--background-color);
      color: white;
      border: none;
      padding: 0 1rem;
      overflow: visible;
      border-radius: 1rem;
    }

    [popover]::before {
      content: "";
      bottom: 100%;
      left: 50%;
      border: solid transparent;
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-color: transparent;
      border-bottom-color: var(--background-color);
      border-width: 8px;
      margin-left: -8px;
    }

    #invoker {
      anchor-name: --invoker-anchor;
    }
  `;

  html = `<span id="invoker">
      <slot
        name="invoker"
        @focusin="${this.open}"
        @mouseenter="${this.open}"
        @focusout="${this.close}"
        @mouseleave="${this.close}"
      ></slot>
    </span>
    <div popover>
      <slot name="content"></slot>
    </div>`;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = `<style>${this.style}</style>${this.html}`;
    shadow.addEventListener("focusin", this);
    shadow.addEventListener("focusout", this);
    shadow.addEventListener("mouseenter", this);
    shadow.addEventListener("mouseleave", this);
  }

  handleEvent(event: Event) {
    if (event.type === "mouseenter" || event.type === "focusin") {
      this.open();
    }
    if (event.type === "mouseleave" || event.type === "focusout") {
      this.close();
    }
  }

  open() {
    // @ts-expect-error Popover isn't in typescript definitions yet.
    this.shadowRoot?.querySelector("div[popover]")?.showPopover();
  }

  close() {
    // @ts-expect-error Popover isn't in typescript definitions yet.
    this.shadowRoot?.querySelector("div[popover]")?.hidePopover();
  }
}
