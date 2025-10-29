# stack_display.py
class Stack:
    def __init__(self):
        self.items = []

    def display(self):
        print(*self.items)


if __name__ == "__main__":
    s = Stack()
    s.items = [1, 3, 5, 7]
    print("Internal list:", s.items)         # -> [1, 3, 5, 7]
    print("Display method output:")
    s.display()                              # -> 1 3 5 7
