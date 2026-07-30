function getTextColor(color: string): "white" | "black" {
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);

    const rgb = getComputedStyle(div).color;
    document.body.removeChild(div);

    const [r, g, b] = rgb.match(/\d+/g)!.map(Number);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 150 ? "black" : "white";
}

export default getTextColor;