class Queue {
    private Node front, rear;
    private int size;

    private class Node {
        int data;
        Node next;
        Node(int data) {
            this.data = data;
        }
    }

    public void enqueue(int data) {
        Node newNode = new Node(data);
        if (rear == null) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
        size++;
    }

    public int dequeue() {
        if (front == null) return -1;
        int val = front.data;
        front = front.next;
        if (front == null) rear = null;
        size--;
        return val;
    }

    public int peek() {
        if (front == null) return -1;
        return front.data;
    }

    public boolean isEmpty() {
        return front == null;
    }

    public int size() {
        return size;
    }

    public static void main(String[] args) {
        Queue q = new Queue();
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        System.out.println(q.dequeue());
        System.out.println(q.peek());
        System.out.println(q.size());
        System.out.println(q.isEmpty());
    }
}
