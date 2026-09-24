public class Calculator {


    public static double calculate(
            double a,
            double b,
            String operator) {


        switch (operator) {


            case "+":
                return a + b;


            case "-":
                return a - b;


            case "*":
                return a * b;


            case "/":


                if (b == 0) {
                    throw new ArithmeticException(
                        "Cannot divide by zero"
                    );
                }


                return a / b;


            default:


                throw new IllegalArgumentException(
                    "Invalid operator"
                );
        }
    }




    public static void main(String[] args) {


        double a = 10;


        double b = 5;


        String operator = "+";




        double result =
            calculate(a, b, operator);




        System.out.println(
            "Result = " + result
        );


    }
}