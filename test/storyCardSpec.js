describe("Story Card", function() {
    it("should have an id and a title", function () {
        var card = storyCard("ID", "Title");
        expect(card.id).toBe("ID");
        expect(card.title).toBe("Title");
    });
    
    it("should have a id div, title div and a body div", function() {
        var card = storyCard("Id", "Title");
        var sCard = card.html();

        var storyId = sCard.find('.story-id');
        var storyBody = sCard.find('.story-body');
        var storyTitle = sCard.find('.story-title');
        var storyClose = sCard.find('#close-card');

        expect(sCard.attr('class')).toBe('story');
        expect(storyId.length).toBe(1);
        expect(storyTitle.length).toBe(1);
        expect(storyBody.length).toBe(1);
        expect(storyClose.length).toBe(1);
        expect(storyId.attr('contenteditable')).toBe('true');
        expect(storyTitle.attr('contenteditable')).toBe('true');
        expect(storyBody.attr('contenteditable')).toBe('true');
    });

});
