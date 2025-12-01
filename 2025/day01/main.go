package main

import (
	"aoc2025/utils"
	"fmt"
	"strconv"
)

func main() {
	lines, err := utils.ReadLines("day01/day01_input.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println("Part 1:", part1(lines))
	fmt.Println("Part 2:", part2(lines))
}

func part1(lines []string) int {
	pos := 50
	timesAtZero := 0
	moves := map[byte]int{'L': -1, 'R': 1}

	for _, v := range lines {
		direction := v[0]
		num, _ := strconv.Atoi(v[1:])

		pos = ((pos + (moves[direction] * num % 100)) + 100) % 100

		if pos == 0 {
			timesAtZero++
		}
	}

	return timesAtZero
}

func part2(lines []string) int {
	pos := 50
	timesAtZero := 0
	moves := map[byte]int{'L': -1, 'R': 1}

	for _, v := range lines {
		direction := v[0]
		num, _ := strconv.Atoi(v[1:])
		timesAtZero += num / 100

		newPos := ((pos + (moves[direction] * (num % 100))) + 100) % 100
		if (newPos == 0) ||
			(direction == 'L' && newPos > pos && pos != 0) ||
			(direction == 'R' && newPos < pos) {
			timesAtZero++
		}

		pos = newPos
	}

	return timesAtZero
}
