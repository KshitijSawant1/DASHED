# stack_pop.py
class Stack:
    def __init__(self):
        self.items = []

    def pop(self):
        if not self.items:
            return -1
        return self.items.pop()


if __name__ == "__main__":
    s = Stack()
    # seed some values to demonstrate pop
    s.items = [5, 7, 9]
    print("Initial:", s.items)               # -> [5, 7, 9]
    print("Pop:", s.pop())                   # -> 9
    print("Pop:", s.pop())                   # -> 7
    print("Pop:", s.pop())                   # -> 5
    print("Pop on empty:", s.pop())          # -> -1
    print("Final:", s.items)                 # -> []
