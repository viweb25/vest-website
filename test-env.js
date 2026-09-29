require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

async function test() {
  console.log("Testing Nodemailer...");
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    
    // verify connection configuration
    await transporter.verify();
    console.log("✅ Nodemailer is ready");
  } catch (err) {
    console.error("❌ Nodemailer Error:", err.message);
  }

  console.log("\nTesting Supabase...");
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase.from('demo_requests').insert({
      name: 'Test',
      shop_name: 'Test Shop',
      phone: '1234567890',
      location: 'Test Location'
    });
    
    if (error) {
      console.error("❌ Supabase Error:", error.message);
    } else {
      console.log("✅ Supabase is ready");
    }
  } catch (err) {
    console.error("❌ Supabase Error:", err.message);
  }
}

test();
