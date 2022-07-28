"use strict"

function parseCount(number) {
    const parse = Number.parseInt(number);
    if (isNaN(parse)) {
        throw new Error("Невалидное значение");
    } else {
        return parse;
    }
}

function validateCount(number) {
    try {
        return parseCount(number)
    } catch (Error) {
        return Error;
    }
}


class Triangle {
    constructor(sideA, sideB, sideC) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
        if (this.sideA + this.sideB < this.sideC || this.sideA + this.sideC < this.sideB || this.sideC + this.sideB < this.sideA) {
            throw new Error("Треугольник с такими сторонами не существует");
        }
    }

    getPerimeter() {
        return this.sideA + this.sideB + this.sideC;
    }

    getArea() {
        const p = this.getPerimeter() / 2;
        return +Math.sqrt(p * (p - this.sideA) * (p - this.sideB) * (p - this.sideC)).toFixed(3);
    }
}

const differentFigures = {
    getArea() {
        return "Ошибка! Треугольник не существует";
    },

    getPerimeter() {
        return "Ошибка! Треугольник не существует";
    }
}

function getTriangle(sideA, sideB, sideC) {
    try {
        return new Triangle(sideA, sideB, sideC);
    } catch (error) {
        return differentFigures;
    }
}