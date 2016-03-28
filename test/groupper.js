var groupper = require('../groupper');

describe('Groupper', function () {
  it('should not modify NNP tags which are not in sequence', function () {
    var tags = [
      ['Andy', 'NNP'],
      ['is', 'VBZ'],
      ['a', 'DT'],
      ['doctor', 'NN']
    ];

    groupper(tags).should.eql(tags);
  });

  it('should be able to group a sequience of NNP tags', function () {
    var srcTags = [ [ 'Andy', 'NNP' ],
      [ 'is', 'VBZ' ],
      [ 'gonna', 'VBG' ],
      [ 'to', 'TO' ],
      [ 'St', 'NNP' ],
      [ '.', '.' ],
      [ 'Petersburg', 'NNP' ] ];

    groupper(srcTags).should.eql([
      [ 'Andy', 'NNP' ],
      [ 'is', 'VBZ' ],
      [ 'gonna', 'VBG' ],
      [ 'to', 'TO' ],
      [ 'St. Petersburg', 'NNP' ]
    ]);
  });

  it('should group several sequence of NNP and \'.\' tags which are not in sequence', function () {
    var srcTags = [ [ 'Andy', 'NNP' ],
      [ 'is', 'VBZ' ],
      [ 'gonna', 'VBG' ],
      [ 'to', 'TO' ],
      [ 'St', 'NNP' ],
      [ '.', '.' ],
      [ 'Petersburg', 'NNP' ],
      [ '.', '.' ],
      [ 'He', 'PRP' ],
      [ 'wants', 'VBZ' ],
      [ 'to', 'TO' ],
      [ 'familiar', 'JJ' ],
      [ 'with', 'IN' ],
      [ 'Bill', 'NNP' ],
      [ 'Gates', 'NNP' ] ];

    groupper(srcTags).should.eql([
      [ 'Andy', 'NNP' ],
      [ 'is', 'VBZ' ],
      [ 'gonna', 'VBG' ],
      [ 'to', 'TO' ],
      [ 'St. Petersburg', 'NNP' ],
      ['.', '.'],
      [ 'He', 'PRP' ],
      [ 'wants', 'VBZ' ],
      [ 'to', 'TO' ],
      [ 'familiar', 'JJ' ],
      [ 'with', 'IN' ],
      [ 'Bill Gates', 'NNP' ]
    ]);
  });
});