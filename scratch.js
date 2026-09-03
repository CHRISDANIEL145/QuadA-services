const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const envObj = {};
env.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envObj[match[1]] = match[2].trim().replace(/^"|"$/g, '');
});

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(envObj.NEXT_PUBLIC_SUPABASE_URL, envObj.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) console.error('Error fetching users:', error);
  else {
    const user = data.users.find(u => u.email === 'dc318832@gmail.com');
    if (user) {
      console.log('User found:', user.email);
      const { data: updated, error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        password: 'Daniel1100@'
      });
      if (updateError) {
        console.error('Error updating password:', updateError);
      } else {
        console.log('Password reset to Daniel1100@ successfully!');
      }
    } else {
      console.log('User not found in auth.users');
    }
  }
}
check();
