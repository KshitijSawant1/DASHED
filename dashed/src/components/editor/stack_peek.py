# stack_peek.py
class Stack:
    def __init__(self):
        self.items = []

    def peek(self):
        if not self.items:
            return -1
        return self.items[-1]


if __name__ == "__main__":
    s = Stack()
    print("Peek on empty:", s.peek())        # -> -1
    s.items = [2, 4, 6]
    print("Stack:", s.items)                 # -> [2, 4, 6]
    print("Peek:", s.peek())                 # -> 6 (top element)
