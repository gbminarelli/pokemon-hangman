/* I'm choosing not to use JSX in this project because I don't want to set up the extra compilation step.
That being said, if I was working with other developers I believe it would be necessary to do so (JSX makes the code 
much more readable). In that case I would either set up a watcher with babel (dynamically compiling scrips) or just 
choose and use one of the many toolchains for React available today - the choice between the two options would depend 
on the size of the project and its requirements. */

const e = React.createElement;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(e(App, null), document.getElementById("root"));
});
