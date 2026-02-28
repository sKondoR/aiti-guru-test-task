export function isArraysEqualUnordered(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    
    const freqMap = new Map<number, number>();
    
    // Count elements in arr1
    for (const num of arr1) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Check against arr2
    for (const num of arr2) {
        const count = freqMap.get(num);
        if (!count) return false;
        freqMap.set(num, count - 1);
    }
    
    return true;
}