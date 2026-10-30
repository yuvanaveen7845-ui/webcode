// Web Programming Lab Experiments Data
const EXPERIMENTS = [
    {
        id: 1,
        title: "Welcome Message and Arithmetic Using Variables",
        shortTitle: "Welcome & Arithmetic",
        aim: "To display a welcome message and perform arithmetic operations using variables.",
        category: "Basics & Variables",
        tags: ["Variables", "Arithmetic", "innerHTML", "Operators"],
        fileName: "experiment_1.html",
        sampleOutput: `Welcome to JavaScript Programming!
Addition: 30
Subtraction: 10
Multiplication: 200
Division: 2`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 1</title>
</head>
<body>
    <h2>Welcome Message and Arithmetic</h2>
    <p id="welcome"></p>
    <p id="result"></p>

    <script>
        let a = 20;
        let b = 10;

        document.getElementById("welcome").innerHTML =
            "Welcome to JavaScript Programming!";

        document.getElementById("result").innerHTML =
            "Addition: " + (a + b) + "<br>" +
            "Subtraction: " + (a - b) + "<br>" +
            "Multiplication: " + (a * b) + "<br>" +
            "Division: " + (a / b);
    </script>
</body>
</html>`
    },
    {
        id: 2,
        title: "Check Positive, Negative or Zero",
        shortTitle: "Positive, Negative or Zero",
        aim: "To check whether a number is positive, negative, or zero.",
        category: "Conditional Logic",
        tags: ["Conditionals", "if-else", "Input Validation", "Number"],
        fileName: "experiment_2.html",
        sampleOutput: `Input: 15 -> Result: The number is Positive.
Input: -8 -> Result: The number is Negative.
Input: 0  -> Result: The number is Zero.`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 2</title>
</head>
<body>
    <h2>Positive, Negative or Zero</h2>

    <input type="number" id="num" placeholder="Enter a number">
    <button onclick="checkNumber()">Check</button>

    <p id="result"></p>

    <script>
        function checkNumber() {
            let n = Number(document.getElementById("num").value);
            let result = document.getElementById("result");

            if (document.getElementById("num").value.trim() === "") {
                result.innerHTML = "Please enter a number.";
            } else if (n > 0) {
                result.innerHTML = "The number is Positive.";
            } else if (n < 0) {
                result.innerHTML = "The number is Negative.";
            } else {
                result.innerHTML = "The number is Zero.";
            }
        }
    </script>
</body>
</html>`
    },
    {
        id: 3,
        title: "Star Pattern Generation",
        shortTitle: "Star Pattern",
        aim: "To generate a star pattern using loops.",
        category: "Loops & Iterations",
        tags: ["Nested Loops", "for loop", "Pattern", "pre format"],
        fileName: "experiment_3.html",
        sampleOutput: `* 
* * 
* * * 
* * * * 
* * * * *`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 3</title>
</head>
<body>
    <h2>Star Pattern</h2>

    <label>Enter number of rows:</label>
    <input type="number" id="rows" min="1" max="20" value="5">
    <button onclick="generatePattern()">Generate</button>

    <pre id="output"></pre>

    <script>
        function generatePattern() {
            let rows = Number(document.getElementById("rows").value);
            let pattern = "";

            if (!Number.isInteger(rows) || rows < 1 || rows > 20) {
                document.getElementById("output").textContent =
                    "Enter a number from 1 to 20.";
                return;
            }

            for (let i = 1; i <= rows; i++) {
                for (let j = 1; j <= i; j++) {
                    pattern += "* ";
                }
                pattern += "\n";
            }

            document.getElementById("output").textContent = pattern;
        }
    </script>
</body>
</html>`
    },
    {
        id: 4,
        title: "Calculator Using Functions",
        shortTitle: "Simple Calculator",
        aim: "To perform arithmetic operations using JavaScript functions.",
        category: "Functions",
        tags: ["Functions", "switch-case", "Parameters", "Arithmetic"],
        fileName: "experiment_4.html",
        sampleOutput: `First: 25, Second: 5
Add -> Result: 30
Subtract -> Result: 20
Multiply -> Result: 125
Divide -> Result: 5`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 4</title>
</head>
<body>
    <h2>Simple Calculator</h2>

    <input type="number" id="a" placeholder="First number">
    <input type="number" id="b" placeholder="Second number">
    <br><br>

    <button onclick="calculate('+')">Add</button>
    <button onclick="calculate('-')">Subtract</button>
    <button onclick="calculate('*')">Multiply</button>
    <button onclick="calculate('/')">Divide</button>

    <p id="result"></p>

    <script>
        function calculate(op) {
            let x = document.getElementById("a").value;
            let y = document.getElementById("b").value;

            if (x.trim() === "" || y.trim() === "") {
                document.getElementById("result").textContent =
                    "Enter both numbers.";
                return;
            }

            x = Number(x);
            y = Number(y);
            let r;

            switch (op) {
                case '+': r = x + y; break;
                case '-': r = x - y; break;
                case '*': r = x * y; break;
                case '/':
                    if (y === 0) {
                        document.getElementById("result").textContent =
                            "Cannot divide by zero.";
                        return;
                    }
                    r = x / y;
                    break;
            }

            document.getElementById("result").textContent =
                "Result: " + r;
        }
    </script>
</body>
</html>`
    },
    {
        id: 5,
        title: "DOM Manipulation (Color and Text Change)",
        shortTitle: "DOM Manipulation",
        aim: "To change text and background color using DOM methods.",
        category: "DOM Manipulation",
        tags: ["DOM", "style", "textContent", "Events"],
        fileName: "experiment_5.html",
        sampleOutput: `After Change Text:
Heading: "DOM Manipulation Example"
Message: "The text has been changed!"

After Change Color:
Background becomes 'lightblue'
Heading color turns 'red'`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 5</title>
</head>
<body>
    <h2 id="heading">Welcome to DOM Manipulation</h2>
    <p id="message">This is the original text.</p>

    <button onclick="changeText()">Change Text</button>
    <button onclick="changeColor()">Change Color</button>

    <script>
        function changeText() {
            document.getElementById("message").textContent =
                "The text has been changed!";
            document.getElementById("heading").textContent =
                "DOM Manipulation Example";
        }

        function changeColor() {
            document.body.style.backgroundColor = "lightblue";
            document.getElementById("heading").style.color = "red";
        }
    </script>
</body>
</html>`
    },
    {
        id: 6,
        title: "To-Do List Using Event Listeners",
        shortTitle: "To-Do List",
        aim: "To add and delete tasks using JavaScript event listeners.",
        category: "Event Listeners",
        tags: ["addEventListener", "createElement", "removeChild", "Dynamic List"],
        fileName: "experiment_6.html",
        sampleOutput: `Interactive To-Do List:
1. Enter task: "Finish Lab Record"
2. Click 'Add Task' or press Enter key
3. Item added with a [Delete] button
4. Click [Delete] removes the specific task item dynamically`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 6</title>
</head>
<body>
    <h2>To-Do List</h2>

    <input type="text" id="task" placeholder="Enter a task">
    <button id="add">Add Task</button>

    <ul id="list"></ul>

    <script>
        const taskInput = document.getElementById("task");
        const addButton = document.getElementById("add");
        const taskList = document.getElementById("list");

        function addTask() {
            const task = taskInput.value.trim();

            if (task === "") {
                alert("Please enter a task.");
                return;
            }

            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = task + " ";

            const del = document.createElement("button");
            del.textContent = "Delete";

            del.addEventListener("click", function () {
                li.remove();
            });

            li.appendChild(span);
            li.appendChild(del);
            taskList.appendChild(li);

            taskInput.value = "";
            taskInput.focus();
        }

        addButton.addEventListener("click", addTask);

        taskInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                addTask();
            }
        });
    </script>
</body>
</html>`
    },
    {
        id: 7,
        title: "Registration Form with Validation",
        shortTitle: "Registration Form",
        aim: "To validate the name, email, password, and confirm password fields.",
        category: "Form Validation",
        tags: ["Forms", "Validation", "Password Match", "preventDefault"],
        fileName: "experiment_7.html",
        sampleOutput: `Validation Scenarios:
- Empty Name -> "Please enter your name."
- Password < 6 chars -> "Password must contain at least 6 characters."
- Password !== Confirm -> "Passwords do not match."
- Valid Input -> "Registration form validated successfully!"`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 7</title>
</head>
<body>
    <h2>Registration Form</h2>

    <form id="registerForm">
        <label>Name:</label>
        <input type="text" id="name" required>
        <br><br>

        <label>Email:</label>
        <input type="email" id="email" required>
        <br><br>

        <label>Password:</label>
        <input type="password" id="password" minlength="6" required>
        <br><br>

        <label>Confirm Password:</label>
        <input type="password" id="confirm" required>
        <br><br>

        <button type="submit">Register</button>
    </form>

    <p id="result"></p>

    <script>
        document.getElementById("registerForm")
            .addEventListener("submit", function (event) {
                event.preventDefault();

                const name = document.getElementById("name").value.trim();
                const password = document.getElementById("password").value;
                const confirm = document.getElementById("confirm").value;
                const result = document.getElementById("result");

                if (name === "") {
                    result.textContent = "Please enter your name.";
                } else if (password.length < 6) {
                    result.textContent =
                        "Password must contain at least 6 characters.";
                } else if (password !== confirm) {
                    result.textContent = "Passwords do not match.";
                } else {
                    result.textContent =
                        "Registration form validated successfully!";
                }
            });
    </script>
</body>
</html>`
    },
    {
        id: 8,
        title: "Form Submission Validation",
        shortTitle: "Form Submission",
        aim: "To validate form fields before allowing form submission.",
        category: "Form Validation",
        tags: ["RegEx", "HTML5 Validation", "Phone Pattern", "Age Check"],
        fileName: "experiment_8.html",
        sampleOutput: `Validation Results:
- Empty Username -> "Username cannot be empty."
- Invalid Age (<1 or >120) -> "Enter a valid age."
- Phone Number pattern -> Enforces 10 digits [0-9]{10}
- Successful Validation -> "Form submitted and validated successfully!"`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 8</title>
</head>
<body>
    <h2>Form Submission Validation</h2>

    <form id="myForm">
        <label>Username:</label>
        <input type="text" id="username" required>
        <br><br>

        <label>Age:</label>
        <input type="number" id="age" min="1" max="120" required>
        <br><br>

        <label>Phone Number:</label>
        <input type="tel" id="phone"
               pattern="[0-9]{10}"
               title="Enter a 10-digit phone number" required>
        <br><br>

        <button type="submit">Submit</button>
    </form>

    <p id="result"></p>

    <script>
        document.getElementById("myForm")
            .addEventListener("submit", function (event) {
                event.preventDefault();

                const username =
                    document.getElementById("username").value.trim();
                const age =
                    Number(document.getElementById("age").value);
                const result = document.getElementById("result");

                if (username === "") {
                    result.textContent = "Username cannot be empty.";
                } else if (age < 1 || age > 120) {
                    result.textContent = "Enter a valid age.";
                } else {
                    result.textContent =
                        "Form submitted and validated successfully!";
                }
            });
    </script>
</body>
</html>`
    },
    {
        id: 9,
        title: "Members Table with Sum and Average",
        shortTitle: "Table Sum & Average",
        aim: "To display members' marks in a table and calculate their total and average.",
        category: "Tables & Arrays",
        tags: ["Objects", "forEach", "Dynamic Table", "Math Calculations"],
        fileName: "experiment_9.html",
        sampleOutput: `Member    Mark
Arun      80
Bala      90
Cathy     70
Divya     85
-----------------
Total     325
Average   81.25`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 9</title>
</head>
<body>
    <h2>Members Marks Table</h2>

    <table border="1" cellpadding="8">
        <thead>
            <tr>
                <th>Member</th>
                <th>Mark</th>
            </tr>
        </thead>
        <tbody id="members"></tbody>
        <tfoot>
            <tr>
                <th>Total</th>
                <td id="total"></td>
            </tr>
            <tr>
                <th>Average</th>
                <td id="average"></td>
            </tr>
        </tfoot>
    </table>

    <script>
        const members = [
            { name: "Arun", mark: 80 },
            { name: "Bala", mark: 90 },
            { name: "Cathy", mark: 70 },
            { name: "Divya", mark: 85 }
        ];

        let sum = 0;
        const tbody = document.getElementById("members");

        members.forEach(function (member) {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            const markCell = document.createElement("td");

            nameCell.textContent = member.name;
            markCell.textContent = member.mark;

            row.appendChild(nameCell);
            row.appendChild(markCell);
            tbody.appendChild(row);

            sum += member.mark;
        });

        document.getElementById("total").textContent = sum;
        document.getElementById("average").textContent =
            (sum / members.length).toFixed(2);
    </script>
</body>
</html>`
    },
    {
        id: 10,
        title: "Matrix Transpose Using a 2D Array",
        shortTitle: "Matrix Transpose",
        aim: "To find the transpose of a matrix using a two-dimensional array.",
        category: "2D Arrays",
        tags: ["2D Arrays", "Matrix", "Nested Loops", "Mapping"],
        fileName: "experiment_10.html",
        sampleOutput: `Original Matrix:
1 2 3
4 5 6

Transpose Matrix:
1 4
2 5
3 6`,
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Experiment 10</title>
</head>
<body>
    <h2>Matrix Transpose</h2>

    <p>Original Matrix:</p>
    <pre id="original"></pre>

    <p>Transpose Matrix:</p>
    <pre id="transpose"></pre>

    <script>
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];

        let transposed = [];

        for (let j = 0; j < matrix[0].length; j++) {
            transposed[j] = [];

            for (let i = 0; i < matrix.length; i++) {
                transposed[j][i] = matrix[i][j];
            }
        }

        document.getElementById("original").textContent =
            matrix.map(row => row.join(" ")).join("\n");

        document.getElementById("transpose").textContent =
            transposed.map(row => row.join(" ")).join("\n");
    </script>
</body>
</html>`
    }
];
