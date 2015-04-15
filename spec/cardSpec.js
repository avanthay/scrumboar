describe('Card', function() {
    var card;

    beforeEach(function() {
        card = new Card();
    });
    afterEach(function() {
        card = null;
    });

    it('should be defined', function() {
        expect(Card).toBeDefined();
        expect(card).toBeDefined();
    });

    describe("Properties", function() {
        it('should have an id', function() {
            expect(card.id).toBeDefined();
        });
        it('should have a title', function() {
            expect(card.has('title')).toBe(true);
            expect(card.get('title').length).toBeGreaterThan(0);
            card.set('title', 'foo');
            expect(card.get('title')).toBe('foo');
        });
        it('should have a description', function() {
            expect(card.has('description')).toBe(true);
        });
        it('should have an effort', function() {
            expect(card.has('effort')).toBe(true);
        });
        it('should have an operator', function() {
           expect(card.has('operator')).toBe(true);
        });
        it('should have a status', function() {
            expect(card.has('status')).toBe(true);
        });
    });

    describe("Validation", function() {
        it("should fail when setting an invalid status", function() {
            card.set('status', 'non-existant');
            expect(card.isValid()).toBe(false);
            card.set('status', null);
            expect(card.isValid()).toBe(false);
            card.unset('status');
            expect(card.isValid()).toBe(false);
        });
        it("should pass when the status is valid", function() {
            card.set('to do');
            expect(card.isValid()).toBe(true);
        });
        it("should fail when setting a non-valid effort amount", function() {
            card.set('effort', 17);
            expect(card.isValid()).toBe(false);
            card.set('effort', 'non-number');
            expect(card.isValid()).toBe(false);
            card.set('effort', null);
            expect(card.isValid()).toBe(false);
            card.unset('effort');
            expect(card.isValid()).toBe(false);
        });
        it("should pass when the effort amount is valid", function() {
            card.set('effort', 2);
            expect(card.isValid()).toBe(true);
        });
    });

});