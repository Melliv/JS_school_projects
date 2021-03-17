export default function gameView() {
    document.body.style.background = "#99cc00";

    let content = document.createElement('div');
    content.id = "view-container";
    content.style.textAlign = "center";
    content.style.alignContent = "center";

    return content;
}