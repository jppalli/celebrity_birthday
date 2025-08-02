"use strict";
const tooltipContainerPaddingInPx = 16;

//------------------------------------------------------------------------------
function updateTooltipLayout(tooltip, placementTarget, container) {
  if (!tooltip.classList.contains("ever-shown")) {
    tooltip.classList.add("ever-shown");
    triggerDomReflow(tooltip);
  }

  const containerRect = container.getBoundingClientRect();
  const containerRectWithPadding =
    new DOMRect(containerRect.x + tooltipContainerPaddingInPx, containerRect.y + tooltipContainerPaddingInPx,
      containerRect.width - tooltipContainerPaddingInPx * 2, containerRect.height - tooltipContainerPaddingInPx * 2);

  const placementTargetRect = placementTarget.getBoundingClientRect();

  // Decide X position
  // =================
  const offsetContainerToTargetCenterLeft =
    placementTargetRect.left + placementTargetRect.width / 2 - containerRectWithPadding.left;
  const tooltipWidth = tooltip.offsetWidth;

  let tooltipLeft = placementTargetRect.width / 2;
  if (offsetContainerToTargetCenterLeft - tooltipWidth / 2 < 0) {
    // Left edge
    tooltipLeft += -offsetContainerToTargetCenterLeft;
  } else if (offsetContainerToTargetCenterLeft + tooltipWidth / 2 > containerRectWithPadding.width) {
    // Right edge
    tooltipLeft += -offsetContainerToTargetCenterLeft + containerRectWithPadding.width - tooltipWidth;
  } else {
    // Centered
    tooltipLeft -= tooltipWidth / 2
  }
  const tooltipArrowOffset = -tooltipLeft + placementTargetRect.width / 2;

  tooltip.style = `left:${tooltipLeft}px; --arrow-offset:${tooltipArrowOffset}px`;

  // Decide - point-up or not
  // ======================================
  const offsetContainerToTargetBottom =
    placementTargetRect.bottom - containerRectWithPadding.top;
  const tooltipStyle = getComputedStyle(tooltip);
  const tooltipOuterHeight = tooltip.offsetHeight +
    parseInt(tooltipStyle.marginTop) + parseInt(tooltipStyle.marginBottom);
  if (offsetContainerToTargetBottom > tooltipOuterHeight) {
    tooltip.classList.add("point-up");
  } else {
    tooltip.classList.remove("point-up");
  }
}

//------------------------------------------------------------------------------
function addTooltipEvents(tooltip) {
  const placementTarget = tooltip.parentNode;
  const container = getAncestorContainer(placementTarget);

  // check when activated to update layout
  let latestActiveState = tooltip.classList.contains("active");
  new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.attributeName == "class") {
        if (latestActiveState != tooltip.classList.contains("active")) {
          // active state changed
          latestActiveState = tooltip.classList.contains("active");
          if (latestActiveState) {
            // tooltip activated
            updateTooltipLayout(tooltip, placementTarget, container);
          }
        }
      }
    }
  }).observe(tooltip, { attributes: true });
}

let timeoutToShowTooltip = null;
//------------------------------------------------------------------------------
function initTooltip(moreInfoElement) {
  let tooltip = moreInfoElement.getElementsByClassName('tooltip')[0];
  moreInfoElement.addEventListener("mouseenter", () => {
    timeoutToShowTooltip = setTimeout(() => {
      // show tooltip after mouse hovered at least 150ms,
      // not immediately, to avoid accidental hovers
      timeoutToShowTooltip = null;
      tooltip.classList.add("active");
    }, 150);
  });
  moreInfoElement.addEventListener("mouseleave", () => {
    if (timeoutToShowTooltip) {
      clearTimeout(timeoutToShowTooltip);
    }
    tooltip.classList.remove("active");
  });
}

//------------------------------------------------------------------------------
class TooltipUtils {
  //----------------------------------------------------------------------------
  static setupTooltip(tooltipElement) {
    const moreInfoElement = tooltipElement.parentNode;

    initTooltip(moreInfoElement);
    addTooltipEvents(tooltipElement)
  }
}