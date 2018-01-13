
casper
  .start('http://localhost:3000/smash_bracket/', () => {
    
    casper.test.begin('page has a correnct title', 1, (test) => {
      test.assertSelectorHasText('title', 'smash_bracket');
      test.done();
    });
    
  })
  .run(() => {
    casper.echo('Done.').exit();
  });
