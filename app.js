var app = new Vue({
    el: '#app',
    data:{
        users:"",
        message: 'Hello Vue!',
        form:{
            id:"",
            fname:"",
            lname:"",
            isEdit:false,
            status:"SAVE"
        }
    },
    methods:{
        submitData(e){
            e.preventDefault();
            check = (this.form.fname != "" && this.form.lname !="");
            if(check && !this.form.isEdit){
                //SAVE
                axios.post("action.php",{
                    fname:this.form.fname,
                    lname:this.form.lname,
                    action:"insert"
                }).then(function(res){
                    app.resetData();
                    app.getAllUsers();
                })
            }
            if(check && this.form.isEdit){
                //Update
                axios.post("action.php",{
                    id:this.form.id,
                    fname:this.form.fname,
                    lname:this.form.lname,
                    action:"update"
                }).then(function(res){
                    app.resetData();
                    app.getAllUsers();
                })
                    console.log("Update Data");
            }
            console.log(this.form.fname);
            console.log(this.form.lname);
            console.log("save");
        },
        resetData(e){
            this.form.id="";
            this.form.fname="";
            this.form.lname="";
            this.form.status="SAVE";
            console.log("clear");
        },
        getAllUsers(){
            axios.post("action.php",{
                action:"getAll"
            }).then(function(res){
                app.users=res.data
                console.log(app.users);
            })
        },
        editUser(id){
            console.log(id);
            this.form.status="Update";
            this.form.isEdit=true;

            axios.post("action.php",{
                action:"geteditUser",
                id:id
            }).then(function(res){
                app.form.id=res.data.id;
                app.form.fname=res.data.fname;
                app.form.lname=res.data.lname;
            })
        },
        deleteUser(id){
            if(confirm("คุณต้องการลบ"+id+"หรือไม่ ?")){
                axios.post("action.php",{
                    action:"getdeleteUser",
                    id:id
                }).then(function(res){
                    console.log(res.data.message);
                    app.resetData();
                    app.getAllUsers();
                })
            }
            
        }
    },
    created(){
        this.getAllUsers();
    }
})