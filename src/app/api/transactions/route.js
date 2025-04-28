// src/app/api/transactions/route.js
import connectDB from "@/lib/database";
import Transaction from "@/models/transaction";
import { transactionSchema } from "@/lib/validations/validateTransaction.js";

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find();
    return new Response(JSON.stringify({ success: true, transactions: transactions }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate request body
    const parsed = transactionSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, message: parsed.error.errors }),
        { status: 400 }
      );
    }

    const newTransaction = await Transaction.create(parsed.data);

    return new Response(
      JSON.stringify({ success: true, data: newTransaction }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
