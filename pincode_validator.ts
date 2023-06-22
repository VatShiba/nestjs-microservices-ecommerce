import * as assert from "assert";

interface IValidator {
    input: number;
    validate(): boolean;
}

interface IPincodeValidator {
    input: number;
    hasSameNumberThreeTimesRespectively(): boolean;
    hasNumberSequencenMoreThanThreeTimes(): boolean;
    hasMoreThanThreeOfSameNumberGroup(): boolean;
}

class PincodeValidator implements IValidator, IPincodeValidator {
    input: number;

    constructor(input: number) {
        this.input = input;
    }

    validate(): boolean {
        const inputStr: string = String(this.input);
        let isValid: boolean = true;
        if (inputStr.length < 6) isValid = false;
        if (this.hasSameNumberThreeTimesRespectively()) isValid = false;
        if (this.hasNumberSequencenMoreThanThreeTimes()) isValid = false;
        if (this.hasMoreThanThreeOfSameNumberGroup()) isValid = false;
        return isValid;
    }

    hasSameNumberThreeTimesRespectively(): boolean {
        const inputStr: string = String(this.input);
        for (let i = 0; i < inputStr.length; i++) {
            if (
                inputStr[i] === inputStr[i + 1] &&
                inputStr[i] === inputStr[i + 2]
            ) {
                return true;
            }
        }
        return false;
    }

    hasNumberSequencenMoreThanThreeTimes() {
        const inputStr: string = String(this.input);
        for (let i = 0; i < inputStr.length; i++) {
            if (
                (parseInt(inputStr[i]) === parseInt(inputStr[i + 1]) + 1 &&
                    parseInt(inputStr[i]) === parseInt(inputStr[i + 2]) + 2) ||
                (parseInt(inputStr[i]) === parseInt(inputStr[i + 1]) - 1 &&
                    parseInt(inputStr[i]) === parseInt(inputStr[i + 2]) - 2)
            ) {
                return true;
            }
        }
        return false;
    }

    hasMoreThanThreeOfSameNumberGroup(): boolean {
        const inputStr: string = String(this.input);
        const numberGroups: Array<string> = [];
        let previousChar: string = inputStr[0];
        let index: number = 0;
        for (let i = 1; i < inputStr.length + 1; i++) {
            let currentChar = inputStr[i];
            if (currentChar !== previousChar) {
                numberGroups.push(inputStr.slice(index, i));
                previousChar = currentChar;
                index = i;
            }
        }
        const groupCount = numberGroups.reduce((p: number, c: string) => {
            if (c.length > 1) p += 1;
            return p;
        }, 0 as number);
        return groupCount >= 3 ? true : false;
    }
}

// Tests //
assert.strictEqual(new PincodeValidator(123).validate(), false);
assert.strictEqual(new PincodeValidator(123123123).validate(), false);
assert.strictEqual(new PincodeValidator(123456).validate(), false);
assert.strictEqual(new PincodeValidator(112233).validate(), false);
assert.strictEqual(new PincodeValidator(123555).validate(), false);
assert.strictEqual(new PincodeValidator(543121).validate(), false);
assert.strictEqual(new PincodeValidator(113322).validate(), false);
assert.strictEqual(new PincodeValidator(5454543).validate(), false);
assert.strictEqual(new PincodeValidator(545454).validate(), true);
assert.strictEqual(new PincodeValidator(11224367).validate(), true);
