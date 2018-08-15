import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    // Complete the hourglassSum function below.
    static int hourglassSum(int[][] arr) {
        ArrayList sums = new AraryList<String>();

        for(int y = 1; y < arr[0].length - 1; y++){
            for(int x = 1; x < arr.length - 1; x++){
//                 Check for domain constraits
                int sum = checkDomain([y][x]) + checkDomain([y - 1][x]) + checkDomain([y - 1][x - 1]) + checkDomain([y - 1][x + 1]) + checkDomain([y + 1][x]) +  checkDomain([y + 1][x - 1]) + checkDomain([y + 1][x + 1]);
                sums.add(sum);
             }
        }

        return Collections.max(sums);
    }

    static int checkDomain(int sum) {
        return (sum >= -9 || sum <= 9) ? sum : 0;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int[][] arr = new int[6][6];

        for (int i = 0; i < 6; i++) {
            String[] arrRowItems = scanner.nextLine().split(" ");
            scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

            for (int j = 0; j < 6; j++) {
                int arrItem = Integer.parseInt(arrRowItems[j]);
                arr[i][j] = arrItem;
            }
        }

        int result = hourglassSum(arr);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedWriter.close();

        scanner.close();
    }
}
