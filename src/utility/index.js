export const repeatObject = (objectOrGenerator, count) =>
    Array(count).fill(null)
        .map(
            (_, index) => ({
                ...(typeof objectOrGenerator === "function"
                    ? objectOrGenerator(index)
                    : objectOrGenerator)
            })
        );

export const replaceInArray = (array, index, newElement) => {
    const arrayCopy = array.slice();
    arrayCopy.splice(index, 1, newElement);

    return arrayCopy;
};
