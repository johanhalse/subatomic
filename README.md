# Subatomic

The functional/atomic CSS generator. Make your stylesheets sing with the power of composition and IDE tooling!


## Roadmap

- [x] One config file should generate a bunch of little atomic classes and act as a blueprint for your atomic css
- [x] Breakpoints and responsive design
- [x] Expansions, like margin-left or border-left or whatever
- [x] Aliases, since things like font-family values don't have auto generatable names
- [x] Make it work as a proper globally installed binary
- [x] ...but make naming.yml overridable
- [ ] Tests coverage of the biggest parts
- [ ] Inline Sublime Text auto-completion, documentation, and "class doesn't exist" warnings
- [ ] Probably the same for Atom
- [ ] But somebody else definitely gets do do it for Vim
- [ ] Auto-generated documentation / style guide
- [ ] Do some kind of screencast because the benefits of this thing aren't immediately obvious
- [ ] Probably like a zillion edge cases with naming and properties?


## Unanswered stuff

- [ ] Classes that do more than one thing (should be "molecules": not atomic per se but sometimes useful, like top+left)
- [ ] Maybe support "only between these breakpoints" rather than a straightforward mobile-first waterfall
