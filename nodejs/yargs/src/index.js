#!/usr/bin/env node

console.log("test yargs");

const dedent = require("dedent");
const { boolean } = require("yargs");
const yargs = require("yargs/yargs");

const argv = process.argv.slice(2);

const cli = yargs()


cli
  .usage("Usage: $0 <command> [options]")
  .strict()
  .fail((msg, err) => {
    console.log(msg);
  })
  .alias("v", "version")
  .alias("h", "help")
  .demandCommand(1, "A command is required. Pass --help to see all available commands and options.")
  .recommendCommands()  // 当command错误的时候，可以提示相似的command
  .options({
    loglevel: {
      defaultDescription: "info",
      describe: "What level of logs to report.",
      type: "string",
    },
    sort: {
      defaultDescription: "true",
      describe: "Sort packages topologically (all dependencies before dependents).",
      type: "boolean",
      default: undefined,
    },
    debug:{
      type:"boolean",
      describe: "is debug",
      alias:["dd"],
      hidden:true
    }
  })
  // .wrap(cli.terminalWidth())
  .wrap(350)
  .epilogue(dedent`
  When a command fails, all logs are written to lerna-debug.log in the current working directory.

  For more information, find our manual at https://github.com/lerna/lerna
  `);

cli
.command({
  command:"list",
  aliases:["ls","ll"],
  describe:"show list",
  builder: yargs =>{
    console.log("list builder");
    yargs.options({
      json: {
        group: "Command Options:",
        describe: "Show information in JSON format",
        type: "boolean",
        default: undefined,
      },
    });
  },
  handler: argv =>{
    console.log("list handler");
    console.log(argv);
  }
});

cli.parse(argv,{
  hehe:"hehe"
})



