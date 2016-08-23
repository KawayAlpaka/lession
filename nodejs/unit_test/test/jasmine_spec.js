var BubbleSort = require('../src/BubbleSort.js'); //引入BubbleSort.js
describe('basic tests', function(){
    it('test sample', function(){
        expect(BubbleSort.BubbleSort([42,75,84,63,13])).toEqual([13,42,63,75,84]);
    });
    it('test fail sample', function(){
        expect(BubbleSort.BubbleSort([42,75,84,63,13])).toEqual([13,42,63,84,75]);
    });
});