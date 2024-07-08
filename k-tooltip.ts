/** @todo This needs to be checked for accessibility. */
export class KToolTip extends HTMLElement {
  css = `
    :host {
      --background-color: #333333;
      --foreground-color: #FFFFFF;
    }

    /* https://developer.chrome.com/blog/anchor-positioning-api */

    #invoker {
      anchor-name: --invoker-anchor;
    }

    [popover] {
      /* Positioning */
      inset-area: bottom;
      position-anchor: --invoker-anchor;
      margin-top: 8px;

      /* Make it look like a tooltip */
      max-width: 300px;
      background: var(--background-color);
      color: var(--foreground-color);
      border: none;
      padding: 5px 10px;
      overflow: visible;
      border-radius: 10px;
    }

    /* Create a tooltip triangle/arrow */
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
      border-width: 4px;
      margin-left: -4px;
    }
  `;

  html = `
<span id="invoker">
  <slot name="invoker"></slot>
</span>
<div popover>
  <slot name="content"></slot>
</div>`;

  static observedAttributes = ["open"];

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<style>${this.css}</style>${this.html}`;
    shadow.addEventListener("focusin", this);
    shadow.addEventListener("focusout", this);
    shadow.addEventListener("mouseover", this);
    shadow.addEventListener("mouseout", this);
  }

  handleEvent(event: Event) {
    if (event.type === "mouseover" || event.type === "focusin") {
      this.open();
    }
    if (event.type === "mouseout" || event.type === "focusout") {
      this.close();
    }
  }

  open() {
    if (this.hasAttribute("open")) return;

    // @ts-expect-error Popover isn't in typescript definitions yet.
    this.shadowRoot?.querySelector("div[popover]")?.showPopover();
    this.setAttribute("open", "");
  }

  close() {
    if (!this.hasAttribute("open")) return;

    // @ts-expect-error Popover isn't in typescript definitions yet.
    this.shadowRoot?.querySelector("div[popover]")?.hidePopover();
    this.removeAttribute("open");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "open" && newValue === null) this.close();
    if (name === "open" && newValue !== null) this.open();
  }
}
