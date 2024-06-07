export async function getRandomProject() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    const response = await fetch('http://dummyjson.com/users/'+randomNumber);
    const data = await response.json();
    return data.firstName + ' ' + data.lastName;
  }
  
  export async function getRandomTask() {
    const response = await fetch('https://dummyjson.com/todos/random');
    const data = await response.json();
    return data.todo;
  }