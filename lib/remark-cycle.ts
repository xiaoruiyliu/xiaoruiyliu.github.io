// Turns "[option one/ option two]" in plain text into a clickable <cycle> element.

type Node = {
  type: string;
  value?: string;
  children?: Node[];
  data?: { hName?: string; hProperties?: Record<string, unknown> };
};

const CYCLE = /\[([^\[\]]+?\/[^\[\]]+?)\]/g;

function splitText(value: string): Node[] {
  const nodes: Node[] = [];
  let last = 0;
  const pattern = new RegExp(CYCLE.source, "g");
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(value))) {
    const start = match.index;
    if (start > last) nodes.push({ type: "text", value: value.slice(last, start) });
    const options = match[1].split("/").map((option) => option.trim()).filter(Boolean);
    nodes.push({
      type: "cycle",
      children: [{ type: "text", value: options[0] }],
      data: { hName: "cycle", hProperties: { options: options.join("|") } },
    });
    last = start + match[0].length;
  }
  if (last < value.length) nodes.push({ type: "text", value: value.slice(last) });
  return nodes;
}

function transform(node: Node) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    if (child.type === "text" && child.value && child.value.match(CYCLE)) {
      return splitText(child.value);
    }
    transform(child);
    return [child];
  });
}

export default function remarkCycle() {
  return (tree: Node) => transform(tree);
}
