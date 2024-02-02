function main() {
  const content = document.body;
  const r_val = Math.floor(Math.random() * 255);
  const g_val = Math.floor(Math.random() * 255);
  const b_val = Math.floor(Math.random() * 255);

  content.style.backgroundColor = `rgb(${r_val}, ${g_val}, ${b_val})`;

  let text_color;

  if (r_val * 0.299 + g_val * 0.587 + b_val * 0.114 > 186) {
    text_color = "#000000";
  } else {
    text_color = "#ffffff";
  }

  content.style.color = text_color;
}

document.onload(main());
