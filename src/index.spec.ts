import { expect, assert } from 'chai'

describe('This works!', () => {
    it('should pass', () => {
        const foo = 'bar'
        assert.equal(foo, 'bar');
        expect(true).to.be.true
    })
})