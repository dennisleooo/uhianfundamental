// Init value
var arrProduct = [
    { id: 1579581080923,category: 'Fast Food' , name: "Noodle", price: 3500, stock : 9},
    { id: 1579581081130,category: 'Electronic' , name: "Headphone", price: 4300000, stock :8 },
    { id: 1579581081342,category: 'Cloth' , name: "Hoodie", price: 300000, stock :7 },
    { id: 1579581081577,category: 'Fruit' , name: "Apple", price: 10000, stock :8 }
  ];
  
// init value
var arrCategory = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];

var arrCart = []

var indexdelete=-1

let tampilkanawal=(arr)=>{
    var outputprod=arr.map((val,index)=>{
        return (
            ` <tr>
                <td>${val.id}</td>
                <td>${val.category}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.stock}</td>
                <td><input type='button' value='add' onclick='funadd(${index})'/></td>
                <td><input type='button' value='delete' onclick='fundelete(${index})'/></td>
                <td><input type='button' value='edit' onclick='funedit(${index})'/></td>
            </tr>`
        )
    }).join('')
    var outputcategory=arrCategory.map((val)=>{
        return (
            `<option value='${val}'>${val}</option>`
        )
    }).join('')
    document.getElementById('categoryFilter').innerHTML=outputcategory
    document.getElementById('categoryInput').innerHTML=outputcategory
    document.getElementById('render').innerHTML=outputprod
}

const fundelete=(index)=>{
    // console.log(index)
    indexdelete=index
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
}
const funedit=(index)=>{
    indexedit=index
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
}

let funInputData=()=>{
    var _name = document.getElementById("nameInput").value;
    var _price = document.getElementById("priceInput").value;
    var _category = document.getElementById("categoryInput").value;
    var _stock = document.getElementById("stockInput").value;
    // create date instance
    var time = new Date().getTime()
    arrProduct.push(
        { 
            id: time,
            category:_category , 
            name: _name, 
            price: _price, 
            stock : _stock
        },
    )
    document.getElementById("nameInput").value='';
    document.getElementById("priceInput").value='';
    document.getElementById("categoryInput").value='';
    document.getElementById("stockInput").value='';
    tampilkanawal()
}

let filter=()=>{
    var nameinput=document.getElementById('keyword').value //''
    var minprice=document.getElementById('min').value // ''
    // console.log(typeof(minprice))
    var maxprice=document.getElementById('max').value // ''
    var category=document.getElementById('categoryFilter').value
    var newarr=arrProduct.filter((val)=>{
        var inputname=val.name.toLowerCase().includes(nameinput.toLowerCase())//boolean
        // if(!nameinput){
        //     inputname=true //kalo inputnya kosong
        // }
        var inputprice=val.price>=minprice&&val.price<=maxprice
        if(!minprice||!maxprice){
            inputprice=true // klo inputannya kosong
        }
        var inputcategory=val.category==category&&category!=='All'
        if(category=='All'){
            inputcategory=true //klo inputannta kosong
        }
        return inputname && inputprice && inputcategory //true 
    })
    document.getElementById('render').innerHTML=Showfilter(newarr).join('')
}
let funFilterName=()=>{
    var nameinput=document.getElementById('keyword').value
    var newarr= arrProduct.filter((val)=>{
        return val.name.toLowerCase().includes(nameinput.toLowerCase())
    })
    document.getElementById('render').innerHTML=Showfilter(newarr).join('')

}
let funFilterPrice=()=>{
    var minprice=document.getElementById('min').value
    var maxprice=document.getElementById('max').value
    var newarr=arrProduct
    if(minprice!='' && maxprice!=''){
        newarr=arrProduct.filter((val)=>val.price>=minprice&&val.price<=maxprice)
    }
    document.getElementById('render').innerHTML=Showfilter(newarr).join('')
}
let funFilterCategory=()=>{
    var category=document.getElementById('categoryFilter').value
    // document.getElementById('categoryFilter').value
    console.log(category)
    var newarr
    if(category!=='All'){
        console.log('ass')
        newarr= arrProduct.filter((val)=>{
            return val.category==category&&category!=='All'
        })
    }else{
        newarr= arrProduct
        console.log('aaa')
    }
    document.getElementById('render').innerHTML=Showfilter(newarr).join('')

}
var indexedit=-1

const funccanceldelete=()=>{
    indexdelete=-1
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
}
const funccanceledit=()=>{
    indexedit=-1
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')

}
const funsaveedit=()=>{
    var nameinputedit=document.getElementById('editnama'+indexedit).value //''
    var priceedit=document.getElementById('editprice'+indexedit).value // ''

    var stokedit=document.getElementById('editstock'+indexedit).value // ''
    var categoryedit=document.getElementById('editcategory'+indexedit).value
    console.log(nameinputedit,priceedit,stokedit,categoryedit)
    arrProduct.splice(indexedit,1,{
        ...arrProduct[indexedit],
        category:categoryedit,
        name:nameinputedit,
        stock:stokedit,
        price:priceedit
    })
    indexedit=-1
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
}
const savedelete=()=>{
    arrProduct.splice(indexdelete,1)
    indexdelete=-1
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
}
const deleteCart=(id)=>{
    console.log(id)
    var index = arrCart.indexOf(arrCart.find(object => object.id === id))
    var indexProduct = arrProduct.indexOf(arrProduct.find(object => object.id === arrProduct[index].id))
    arrProduct[indexProduct].stock += arrCart[index].stock
    //  productObject.stock += arrCart[index].stock
    // console.log(productObject)
    arrCart.splice(index,1)
    result = ""
    for(let i =0; i< arrCart.length; i++){
        result +=
            `<tr>
            <td>${arrCart[i].id}</td>
            <td>${arrCart[i].category}</td>
            <td>${arrCart[i].name}</td>
            <td>${arrCart[i].price}</td>
            <td>${arrCart[i].stock}</td>
            <td><input type='button' onclick='deleteCart(${arrCart[i].id})' value='delete'/></td>
        </tr>`
    }
    document.getElementById('renderCart').innerHTML=result
    // document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
}


const funadd=(index)=>{
    var result = "";
    // var stock = 0
    if(!arrCart.find(object => object.id === arrProduct[index].id)){
        var newObject = { id: arrProduct[index].id, category: arrProduct[index].category , name: arrProduct[index].name, price: arrProduct[index].price, stock : 1}
        arrCart.push(newObject)
        var productObjectA = arrProduct.find(object => object.id === arrProduct[index].id)
        productObjectA.stock -= 1;
        console.log(productObjectA.stock)

    }else{
        var indexCart = arrCart.indexOf(arrCart.find(object => object.id === arrProduct[index].id))
        var productObject = arrProduct.find(object => object.id === arrProduct[index].id)
        console.log(productObject.stock)
        if(productObject.stock <= 0 ){
            alert("produk habis")
        }else{
            arrCart[indexCart].stock += 1
            productObject.stock -= 1;
        }
    }
    for(let i =0; i< arrCart.length; i++){
        result +=
            `<tr>
            <td>${arrCart[i].id}</td>
            <td>${arrCart[i].category}</td>
            <td>${arrCart[i].name}</td>
            <td>${arrCart[i].price}</td>
            <td>${arrCart[i].stock}</td>
            <td><input type='button' onclick='deleteCart(${arrCart[i].id})' value='delete'/></td>
        </tr>`
        }

    console.log(result)
    document.getElementById('render').innerHTML=Showfilter(arrProduct).join('')
    document.getElementById('renderCart').innerHTML=result
}

function Showfilter(filterarr){
    return filterarr.map((val,index)=>{
        if(index==indexdelete){
            return(
                `<tr>
                    <td>${val.id}</td>
                    <td>${val.category}</td>
                    <td>${val.name}</td>
                    <td>${val.price}</td>
                    <td>${val.stock}</td>
                    <td><input type='button' value='add' onclick='funadd(${index})'/></td>
                    <td><input type='button' onclick='savedelete()' value='yes'/></td>
                    <td><button onclick='funccanceldelete()'>cancel</button></td>
                </tr>`
            )
        }else if(index==indexedit){
            var outputcategory=arrCategory.map((val1)=>{
                if(val1===val.category){
                    return `<option value='${val1}' selected>${val1}</option>`
                }
                return (
                    `<option value='${val1}'>${val1}</option>`
                )
            }).join('')
            return(
                `<tr>
                    <td>${val.id}</td>
                    <td><select id='editcategory${index}'>${outputcategory}</select></td>
                    <td> <input type="text" value='${val.name}' id="editnama${index}"></td>
                    <td> <input type="number" value='${val.price}' id="editprice${index}"></td>
                    <td> <input type="number" value='${val.stock}' id="editstock${index}"></td>
                    <td><input type='button' value='add' onclick='funadd(${index})'/></td>
                    <td><input type='button' onclick='funsaveedit()' value='save'/></td>
                    <td><button onclick='funccanceledit()'>cancel</button></td>
                </tr>`
            )
        }
        return(
            `<tr>
                <td>${val.id}</td>
                <td>${val.category}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.stock}</td>
                <td><input type='button' value='add' onclick='funadd(${index})'/></td>
                <td><input type='button' value='delete' onclick='fundelete(${index})'/></td>
                <td><input type='button' value='edit' onclick='funedit(${index})'/></td>
            </tr>`
        )
     })
 }
tampilkanawal(arrProduct)