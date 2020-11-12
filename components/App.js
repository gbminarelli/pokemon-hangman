// TODO: split into different components.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cache: {},
      rawData: {
        name: null,
        art: null,
      },
      lettersGuessed: [],
      crossedLetters: [],
      nameArray: [],
      newGame: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (
      event.keyCode >= 65 &&
      event.keyCode <= 90 &&
      !this.state.lettersGuessed.includes(event.key) &&
      !this.state.newGame
    ) {
      this.setState((state) => ({
        lettersGuessed: state.lettersGuessed.concat([event.key]),
        crossedLetters: state.nameArray.includes(event.key)
          ? state.crossedLetters
          : state.crossedLetters.concat([event.key]),
        newGame: state.nameArray.every((element) =>
          state.lettersGuessed.concat([event.key]).includes(element)
        ),
      }));
    }
  }

  handleClick() {
    const randomIndex = Math.floor(Math.random() * 151 + 1);
    if (this.state.cache[randomIndex]) {
      console.log("Cached data");
      this.setState((state) => ({
        newGame: false,
        rawData: {
          name: state.cache[randomIndex].name,
          art: state.cache[randomIndex].art,
        },
        lettersGuessed: [],
        crossedLetters: [],
        nameArray: state.cache[randomIndex].name.split(""),
      }));
    } else {
      console.log("Fetching new data");
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState((state) => ({
            cache: {
              ...state.cache,
              [randomIndex]: {
                name: data.name,
                art: data.sprites.other["official-artwork"].front_default,
              },
            },
            newGame: false,
            rawData: {
              name: data.name,
              art: data.sprites.other["official-artwork"].front_default,
            },
            lettersGuessed: [],
            crossedLetters: [],
            nameArray: data.name.split(""),
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return e(
      "div",
      null,
      e(
        "button",
        { id: "fetch-pkm", onClick: this.handleClick },
        this.state.rawData.name ? "Reload?" : "Start!"
      ),
      this.state.rawData.name
        ? e(
            "div",
            null,
            e(
              "div",
              { id: "pkm-art-wrapper" },
              e("img", {
                src: this.state.rawData.art,
                ...(this.state.newGame ? null : { className: "pkm-filter" }),
              })
            ),
            e(
              "div",
              null,
              ...this.state.nameArray.map((element) =>
                e(
                  "div",
                  { className: "letter" },
                  this.state.lettersGuessed.includes(element)
                    ? element.toUpperCase()
                    : "_"
                )
              )
            ),
            e(
              "div",
              null,
              ...this.state.crossedLetters.map((element) =>
                e(
                  "div",
                  { className: "letter crossed-letter" },
                  element.toUpperCase()
                )
              )
            )
          )
        : null
    );
  }
}
