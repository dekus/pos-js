module.exports = function (tags) {
  var NNP = 'NNP';
  var DOT = '.';
  var groupedTags = [];
  var activeGroup = {};

  groupedTags.push(activeGroup);

  tags.forEach(function (item, index) {
    var tag = item[1];

    if (tag === NNP && activeGroup.startIndex === undefined) {
      // Start grouped tags collection
      activeGroup.startIndex = index;
      activeGroup.endIndex = index;
    } else if ((tag === NNP || tag === DOT) && index === activeGroup.endIndex + 1) {
      // Expand group diapason
      activeGroup.endIndex = index;
    } else if (tag !== 'NNP' && activeGroup.endIndex !== undefined) {
      if (activeGroup.startIndex !== activeGroup.endIndex) {
        // Exclude the last dot char
        if (tags[activeGroup.endIndex][0] === DOT) {
          activeGroup.endIndex--;
        }

        // Create new tags group
        activeGroup = {};
        groupedTags.push(activeGroup);
      } else {
        // Reset a group rule for a single NNP
        delete activeGroup.startIndex;
        delete activeGroup.endIndex;
      }
    }
  });

  return group();

  /**
   * Groups tags according to group rules
   *
   * @return {Array}
   */
  function group() {
    var outArr = tags.slice(0);
    var delta = 0;

    groupedTags.forEach(function (rule) {
      if (rule.startIndex < rule.endIndex) {
        var deletedItems = outArr.splice(rule.startIndex - delta, rule.endIndex - rule.startIndex + 1);

        delta = rule.endIndex - rule.startIndex;
        outArr.splice(rule.startIndex, 0, mergeGroup(deletedItems));
      }
    });

    return outArr;
  }

  /**
   * Returns merged tags
   *
   * @param {Array} group   A group to merge
   * @return {Array}
   */
  function mergeGroup(group) {
    return group.reduce(function (out, tag, index) {
      var divider = tag[1] === NNP && index ? ' ' : '';

      out[0] += divider + tag[0];

      return out;
    }, ['', 'NNP']);
  }
};