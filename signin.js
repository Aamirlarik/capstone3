// API سے تمام یوزرز کو لوکل سٹورج میں سیو کریں
async function fetchUsers() {
  try {
    const response = await fetch('https://fakestoreapi.com/users');
    const users = await response.json();
    const userData = users.map(user => ({ email: user.email, password: user.password }));
    localStorage.setItem('users', JSON.stringify(userData));
  } catch (error) {
    console.error('Error:', error);
  }
}

// چیک کریں کہ کوئی دوسرا یوزر سائن اپ یا لاگ ان نہیں کر سکتا
async function handleAuth(email, password) {
  try {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const user = storedUsers.find(user => user.email === email && user.password === password);
    alert('Signup Successfully')
    window.location.href = "./login.html"
    if (!user) {
      console.error("Something is wrong, Please try again");
      return;
    }
    alert("Sign up Scuceessfully ")
    // سائن اپ یا لاگ ان کے لیے آپ کی ضرورت کے مطابق کوڈ لکھیں
  } catch (error) {
    console.error('An error occured', error);
  }

  window.location.href = "./login.html"
}

// پہلے API سے تمام یوزرز کو لوکل س   ٹورج میں سیو کریں
fetchUsers();