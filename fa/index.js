const $elements = createObjectElement(document.querySelectorAll("[id]"), "id");
let justone = true;

function elementPopover(html = "") {
  let element = document.createElement("div");
  element.innerHTML = `
    <div style="position: fixed; inset: 0; z-index: 9999;"></div>
  `;
  element = element.firstElementChild;
  element.innerHTML = html || "";

  element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) element.remove();
  });

  return element;
}

$elements.confirm_button_not.addEventListener("mouseover", () => {
  $elements.confirm.append($elements.confirm_button_not);

  const scale =
    parseInt($elements.confirm_button_not.getAttribute("data-scale")) - 2;
  const scale2 =
    parseInt($elements.confirm_button_yes.getAttribute("data-scale")) + 1;
  $elements.confirm_button_not.setAttribute("data-scale", scale);
  $elements.confirm_button_yes.setAttribute("data-scale", scale2);

  styleElement($elements.confirm_button_not, {
    position: "absolute",
    left: `${rand(90)}%`,
    top: `${rand(90)}%`,
    transform: `scale(${Math.max(scale / 100, 0)})`,
  });

  styleElement($elements.confirm_button_yes, {
    transform: `scale(${scale2 / 10})`,
  });
});

$elements.confirm_button_yes.addEventListener("click", () => {
  const popover = elementPopover(`
    <div class="letter" >
      <div class="letter_2">
          <h2>AWWW, sabia que si, yo tambien <span style="color:pink">te extrañe mucho</span>, feliz 15 ❤️</h2>
          <button class="button_Pqxkg01"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-question"><path d="M12,20c-.552,0-1-.447-1-1,0-2.318,1.382-4.357,3.891-5.741,2.287-1.26,3.469-3.755,3.012-6.355-.423-2.408-2.399-4.385-4.808-4.808-1.812-.318-3.57,.147-4.952,1.307-1.363,1.144-2.144,2.82-2.144,4.597,0,.552-.448,1-1,1s-1-.448-1-1c0-2.37,1.042-4.604,2.858-6.129C8.673,.347,11.074-.289,13.441,.126c3.222,.565,5.866,3.21,6.432,6.432,.598,3.402-1.017,6.798-4.016,8.453-1.303,.718-2.857,1.993-2.857,3.989,0,.553-.448,1-1,1Zm-1.5,2.5c0,.828,.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5,.672-1.5,1.5Z"></path></svg></button>
      </div>
    </div>
  `);

  popover.querySelector("button").addEventListener("click", () => {
    $elements.fullscreen.requestFullscreen();
    uno($elements.fullscreen.children.length == 1);
  });

  $elements.app.append(popover);
});

const uno = (status) => {
  console.log(status);
  if (!status) return;

  function rand(...e) {
    let [t, n = 0] = e.reverse();
    return Math.floor(Math.random() * (t + 1 - n) + n);
  }

  const $component = (animation) => {
    const number = rand(0, 100);

    const emojis = ["🌻", "💌", "🌼"];

    let emoji = number == 15 ? emojis[1] : emojis[0];
    emoji = number == 7 ? emojis[2] : emoji;

    let $element = document.createElement("div");
    $element.innerHTML = `<span class="span_rFwtfb1" data-number="${number}">${emoji}</span>`;
    $element = $element.children[0];

    $element.style.setProperty(
      "--max-top",
      `${number == 15 || !animation ? rand(83, number == 15 ? 95 : 97) : 120}%`
    );

    $element.style.setProperty("--opacity", number == 15 ? 1 : rand(0, 3) / 10);

    $element.style.animation = `fall ${
      animation ? rand(15, 150) : 0
    }s linear forwards`;
    $element.style.left = `${rand(-20, 120)}%`;
    $element.style.transform = `rotate(${rand(-45, 45)}deg)`;

    if (number == 15) {
      $element.style.left = `${rand(0, 95)}%`;
      if (justone || (frases.length && animation)) {
        justone = false;
        $element.style.zIndex = 999;
        const frase = rand(frases.length - 1);
        $element.setAttribute("data-message", frases[frase]);
        frases = frases.filter((_, index) => index != frase);
      } else {
        console.log("ya no hay frases");
        $element.innerHTML = emojis[0];
        $element.setAttribute("data-number", 0);
      }
    }

    if (animation) {
      $element.addEventListener(
        "animationend",
        () => {
          $element.style.animation = "fall 0s forwards";
          if (![15, 7].includes(number)) {
            $element.remove();
          }
        },
        { once: true }
      );
    }

    return $element;
  };

  $elements.fullscreen.append(
    ...Array.from({ length: 2000 }).map(() => {
      return $component(false);
    })
  );

  $elements.fullscreen.append(
    ...Array.from({ length: 300 }).map(() => {
      return $component(true);
    })
  );
  setInterval(() => {
    if ($elements.fullscreen.children.length > 3000) {
      $elements.fullscreen.append(
        ...Array.from({ length: 3 }).map(() => {
          return $component(true);
        })
      );
    } else {
      $elements.fullscreen.append(
        ...Array.from({ length: 10 }).map(() => {
          return $component(true);
        })
      );
    }
  }, 3000);

  addEventListener("click", (e) => {
    const span = e.target.closest("span");
    if (span) {
      const number = span.getAttribute("data-number");
      // console.log(span);
      if (number != "15") return span.remove();

      $elements.fullscreen.append(
        elementPopover(`
        <div class="letter" >
          <div class="letter_2">
              <h2>${span.getAttribute("data-message")}</h2>
          </div>
        </div>
      `)
      );
    }
  });
};

document.addEventListener("fullscreenchange", () => {
  $elements.fullscreen.style.display =
    document.fullscreenElement == $elements.fullscreen ? "" : "none";

  if (document.fullscreenElement == $elements.fullscreen) {
    if (window.screen.orientation && window.screen.orientation.lock) {
      window.screen.orientation.lock("landscape");
    }
  } else {
    if (window.screen.orientation && window.screen.orientation.unlock) {
      window.screen.orientation.unlock();
    }
  }
});

fetch('https://app.victor01sp.com/wsp/get.php?code=FiIc1e1')
