export type XMLGroup = {
  moduleDescription: string;
  moduleCode: string;
  columns: string[];
  rows: { [key: string]: string }[];
};

export function parseXMLData(xmlString: string) {
  try {
    const parser = new DOMParser();
    const moduleElements = parser.parseFromString(xmlString, "text/xml").querySelectorAll("module");
    const groups: XMLGroup[] = [];

    moduleElements.forEach((moduleElement) => {
      const moduleCode = moduleElement.getAttribute("code") ?? "";
      const moduleDescription = moduleElement.getAttribute("description") ?? "";

      const segmentElements = moduleElement.querySelectorAll("segment");
      const allNodeNames = new Set<string>();

      if (segmentElements.length > 0) {
        segmentElements.forEach((segmentElement) => {
          segmentElement.querySelectorAll("item").forEach((itemElement) => {
            itemElement.querySelectorAll("node").forEach((nodeElement) => {
              const nodeName = nodeElement.getAttribute("name") ?? "";
              if (nodeName) {
                allNodeNames.add(nodeName);
              }
            });
          });
        });
      }

      groups.push({
        moduleDescription,
        moduleCode,
        columns: Array.from(allNodeNames).sort(),
        rows: [],
      });
    });

    const allDataRows: { [key: string]: string }[] = [];
    const consolidatedRow: { [key: string]: string } = {};

    moduleElements.forEach((moduleElement) => {
      moduleElement.querySelectorAll("segment").forEach((segmentElement) => {
        segmentElement.querySelectorAll("item").forEach((itemElement) => {
          itemElement.querySelectorAll("node").forEach((nodeElement) => {
            const nodeName = nodeElement.getAttribute("name") ?? "";
            if (nodeName) {
              consolidatedRow[nodeName] = nodeElement.textContent ?? "";
            }
          });
        });
      });
    });

    if (Object.keys(consolidatedRow).length > 0) {
      allDataRows.push(consolidatedRow);
    }

    groups.forEach((group) => {
      group.rows = allDataRows;
    });

    return groups;
  } catch (error) {
    console.error("Error parsing XML:", error);
    return [];
  }
}
