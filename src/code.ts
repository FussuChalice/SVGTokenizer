import { figmaElementsToColorTable } from "./color";

figma.showUI(__html__, { width: 720, height: 590, themeColors: true });

const selectedElement = figma.currentPage.selection[0];

const findChildrenElements = (rootElem) => {
  const result = [rootElem];

  if ("children" in rootElem) {
    rootElem.children.forEach((child) => {
      result.push(...findChildrenElements(child));
    });
  }

  return result;
};

const sendColorsToUI = async (elements) => {
  try {
    const colors = await figmaElementsToColorTable(elements);
    figma.ui.postMessage({ type: "colors", data: colors });
  } catch (error) {
    console.error("Error processing colors:", error);
  }
};

const sendSVGCodeToUI = async (elementForExport, elements) => {
  try {
    if ("exportAsync" in elementForExport) {
      const svgBuffer = await elementForExport.exportAsync({
        format: "SVG",
        svgIdAttribute: true,
      });

      let svgCode = String.fromCharCode(...svgBuffer);

      elements.forEach((el) => {
        if (el.name && el.id) {
          svgCode = svgCode.replace(`id="${el.name}"`, `id="${el.id}"`);
        }
      });

      figma.ui.postMessage({ type: "svg-code", data: svgCode });
    }
  } catch (error) {
    console.error("Error exporting SVG:", error);
  }
};

const processSelectedElement = async (element) => {
  if (!element) {
    figma.notify("The element is not selected.");
    figma.closePlugin();
    return;
  }

  const elementsInSVG = findChildrenElements(element);

  await sendColorsToUI(elementsInSVG);
  await sendSVGCodeToUI(element, elementsInSVG);
};

processSelectedElement(selectedElement);

figma.ui.onmessage = async (message) => {
  try {
    if (message.type === "select-layer") {
      const node = await figma.getNodeByIdAsync(message.id);

      if (node) {
        figma.currentPage.selection = [node];
      } else {
        console.log(`Node with ID ${message.id} not found.`);
      }
    }

    if (message.type === "alert") {
      figma.notify(message.data);
    }

  } catch (error) {
    console.error("Error handling UI message:", error);
  }
};
