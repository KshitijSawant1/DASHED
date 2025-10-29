# stack_push.py
class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        self.items.append(x)


if __name__ == "__main__":
    s = Stack()
    s.push(10)
    s.push(20)
    s.push(30)
    # Simple verification
    print("After pushes:", s.items)         # -> [10, 20, 30]
    print(*s.items)                          # space-separated view
