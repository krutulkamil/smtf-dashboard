import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ui-badge',
  styleUrl: 'ui-badge.css',
  shadow: true,
})
export class UiBadge {
  /** Visual variant of the badge */
  @Prop() variant: 'neutral' | 'positive' | 'warning' = 'neutral';

  render() {
    return (
      <Host variant={this.variant}>
        <span class="badge">
          <slot />
        </span>
      </Host>
    );
  }
}
