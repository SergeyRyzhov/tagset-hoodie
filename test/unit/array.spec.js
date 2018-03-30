/* global  describe, it, expect,beforeEach */
import { _Array } from "../../src/core/sugar";

describe("sugar.Array", function() {
  var array = [];
  beforeEach(() => {
    array = [];
    array.push({
      _id: 1,
      title: "nature"
    });
    array.push({
      _id: 2,
      title: "tech"
    });
    array.push({
      _id: 3,
      title: "animals"
    });
  });
  describe("sugar.Array.remove", function() {
    it("remove two objectcs from array", function() {
      _Array.remove(array, [array[0], array[2]]);
      expect(array.length).toBe(1);
    });
    it("remove object from array", function() {
      _Array.remove(array, array[0]);
      expect(array.length).toBe(2);
    });
  });
  describe("sugar.Array.addOrUpdate", function() {
    it("add two objectcs to array", function() {
      _Array.addOrUpdate(array, [
        {
          _id: 4
        },
        {
          _id: 5
        }
      ]);
      expect(array.length).toBe(5);
    });
    it("add object to array", function() {
      _Array.addOrUpdate(array, {
        _id: 4
      });
      expect(array.length).toBe(4);
    });
    it("add and update objectcs in array", function() {
      _Array.addOrUpdate(array, [
        {
          _id: 4
        },
        array[0]
      ]);
      expect(array.length).toBe(4);
      // expect(array[0].title).toBe('test');
    });
    it("update objects in array", function() {
      _Array.addOrUpdate(array, array[0]);
      expect(array.length).toBe(3);
      // expect(array[0].title).toBe('test');
    });
    describe("sugar.Array.addOrUpdate predicate:function", function() {
      it("add and update objectcs in array", function() {
        _Array.addOrUpdate(
          array,
          [
            {
              _id: 4
            },
            {
              _id: 1,
              title: "test"
            }
          ],
          (a, b) => a._id === b._id
        );
        expect(array.length).toBe(4);
        expect(array[0].title).toBe("test");
      });
      it("update objects in array", function() {
        _Array.addOrUpdate(
          array,
          {
            _id: 1,
            title: "test"
          },
          (a, b) => a._id === b._id
        );
        expect(array.length).toBe(3);
        expect(array[0].title).toBe("test");
      });
    });
    describe("sugar.Array.addOrUpdate predicate:props:string", function() {
      it("add and update objectcs in array", function() {
        _Array.addOrUpdate(
          array,
          [
            {
              _id: 4
            },
            {
              _id: 1,
              title: "test"
            }
          ],
          "_id"
        );
        expect(array.length).toBe(4);
        expect(array[0].title).toBe("test");
      });
      it("update objects in array", function() {
        _Array.addOrUpdate(
          array,
          {
            _id: 1,
            title: "test"
          },
          "_id"
        );
        expect(array.length).toBe(3);
        expect(array[0].title).toBe("test");
      });
    });
    describe("sugar.Array.addOrUpdate predicate:props:array", function() {
      it("add and update objectcs in array", function() {
        _Array.addOrUpdate(
          array,
          [
            {
              _id: 4
            },
            {
              _id: 1,
              title: "test"
            }
          ],
          ["_id"]
        );
        expect(array.length).toBe(4);
        expect(array[0].title).toBe("test");
      });
      it("update objects in array", function() {
        _Array.addOrUpdate(
          array,
          {
            _id: 1,
            title: "test"
          },
          ["_id"]
        );
        expect(array.length).toBe(3);
        expect(array[0].title).toBe("test");
      });
    });
  });
});
