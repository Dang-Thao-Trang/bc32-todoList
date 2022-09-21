class ManagerTask {
  constructor() {
    this.tasks = [];
    this.completed = [];
  }
  // them
  addTask(task) {
    this.tasks = [...this.tasks, task];
  }
  // xoa
  delete(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
    this.completed = this.completed.filter((task) => task.name !== taskName);
  }

  filtertask() {
    return this.tasks.filter((task) => {
      if (task.desc === "Tiến Độ") {
        return true;
      }
      return false;
    });
  }

  filterComplete() {
    return this.completed.filter((task) => {
      if (task.desc === "Hoàn Tất") {
        return true;
      }
      return false;
    });
  }

  // check
  checkTaskComplete(taskName) {
    const task = this.tasks.find((t) => t.name === taskName);
    console.log(task);
    if (!task) return;
    this.completed.push(task);
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
  }
  // sort
  // sortWork(val) {
  //   console.log(this.tasks);
  //   return this.tasks.sort((a, b) => {
  //     let value2 = a.name.toLowerCase();
  //     let value1 = b.name.toLowerCase();
  //     if (val == "up") {
  //       return value2 > value1 ? 1 : -1;
  //     } else if (val == "down") {
  //        return value2 > value1 ? -1 : 1;
  //     }
  //   });
  // }

  // sorttaskAsc1() {
  //   this.tasks.sort((task, nextTask) => {
  //     if (task.name > nextTask.name) {
  //       return 1;
  //     }
  //     return -1;
  //   });
  // }

  // sorttaskDesc1() {
  //
  // }

  // sorttaskAsc() {
  //   this.completed.sort((task, nextTask) => {
  //     if (task.name > nextTask.name) {
  //       return 1;
  //     }
  //     return -1;
  //   });
  // }

  sortAz() {
    this.tasks.sort((task, nextTask) => {
      if (task.name > nextTask.name) {
        return 1;
      }
      return -1;
    });
    this.completed.sort((task, nextTask) => {
      if (task.name > nextTask.name) {
        return 1;
      }
      return -1;
    });
  }

  sortZa() {
    this.tasks.sort((task, nextTask) => {
      if (task.name < nextTask.name) {
        return 1;
      }
      return -1;
    });
    this.completed.sort((task, nextTask) => {
      if (task.name < nextTask.name) {
        return 1;
      }
      return -1;
    });
  }
}
