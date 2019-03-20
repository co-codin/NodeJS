const chalk = require('chalk')
const yargs = require('yargs')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing a note');
    }
})

yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function () {
        console.log('Listing a note');
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: function () {
        console.log('Reading a note');
    }
})

yargs.parse()
