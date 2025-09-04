import { Api } from './components/Api.js'

const dom = {
    // 建立連線
    apiUrl: document.querySelector('#api-url'),
    connectBtn: document.querySelector('#connect-btn'),
    connectWrap: document.querySelector('#connect-wrap'),
    disconnectBtn: document.querySelector('#disconnect-btn'),

    // 連線模式
    connectMode: document.querySelector('#connect-mode'),

    // 發送資料
    userName: document.querySelector('#user-name'),
    userAge: document.querySelector('#user-age'),
    sendBtn: document.querySelector('#send-btn'),

    // 資料列表
    dataListWrap: document.querySelector('#data-list-wrap'),
    dataList: document.querySelector('#data-list'),
    editorWrap: document.querySelector('#editor-wrap'),
    editorUid: document.querySelector('#editor-uid'),
    editorName: document.querySelector('#editor-name'),
    editorAge: document.querySelector('#editor-age'),
    editorBtn: document.querySelector('#editor-btn'),
    cancelBtn: document.querySelector('#cancel-btn'),

    // 切換頁籤
    tabApp: document.querySelector('#tab-app'),
    tabList: document.querySelector('#tab-list'),
    tabAdd: document.querySelector('#tab-add'),
}

let api = null

dom.tabApp.addEventListener('click', function (e) {
    e.preventDefault()

    let target = e.target
    if (target.dataset.tab) {
        dom.tabApp.querySelectorAll('a').forEach(function (item) {
            item.classList.remove('active')
        })
        target.classList.add('active')
        document.querySelectorAll('.tab-content').forEach(function (item) {
            item.classList.remove('active')
        })
        document.querySelector(`#${target.dataset.tab}`).classList.add('active')
    }
})

dom.connectBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    dom.connectWrap.classList.remove('connected')
    dom.connectMode.classList.remove('active')
    let url = dom.apiUrl.value
    if (!url) {
        alert('請輸入 API URL')
        return
    }

    try {
        api = new Api(url)
        let response = await api.get({ uid: 1 })
        if (response.code === 200) {
            alert('連線成功')
            dom.connectWrap.classList.add('connected')
            dom.connectMode.classList.add('active')
            dom.apiUrl.disabled = true
        } else {
            alert(response.message)
        }
    } catch (error) {
        alert(error.message)
    }
})

dom.disconnectBtn.addEventListener('click', function (e) {
    e.preventDefault()
    dom.connectWrap.classList.remove('connected')
    dom.connectMode.classList.remove('active')
    dom.apiUrl.value = ''
    dom.apiUrl.disabled = false
    api = null
})

dom.sendBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    if (!api) {
        alert('請先建立連線')
        return
    }

    let name = dom.userName.value
    let age = dom.userAge.value
    if (!name || !age) {
        alert('請輸入名稱和年齡')
        return
    }

    let response = await api.create({ name, age })
    if (response.code === 200) {
        alert('發送資料成功')
        dom.userName.value = ''
        dom.userAge.value = ''
        let uids = getUids()
        uids[response.uid] = { name, age }
        setUids(uids)
        initDataList()
    } else {
        alert(response.message)
    }
})

// 初始化資料列表
const initDataList = function () {
    let tbody = ''
    let uids = getUids()
    for (let uid in uids) {
        tbody += `<tr>
            <td>
                <a href="#" class="edit" data-uid="${uid}">編輯</a>
                <a href="#" class="delete" data-uid="${uid}">刪除</a>
            </td>
            <td>${uid}</td>
            <td>${uids[uid].name}</td>
            <td>${uids[uid].age}</td>
        </tr>`
    }
    dom.dataList.querySelector('tbody').innerHTML = tbody
}

dom.dataList.querySelector('tbody').addEventListener('click', async function (e) {
    e.preventDefault()
    let target = e.target
    if (target.classList.contains('delete')) {
        if (!api) {
            alert('請先建立連線')
            return
        }

        let yn = confirm('確定要刪除嗎？')
        if (!yn) {
            return
        }

        let uid = target.dataset.uid
        let response = await api.delete(uid)
        if (response.code === 200) {
            alert('刪除資料成功')
            let uids = getUids()
            delete uids[uid]
            setUids(uids)
            initDataList()
        } else {
            alert(response.message)
        }
    }

    if (target.classList.contains('edit')) {
        let uids = getUids()
        let uid = target.dataset.uid
        let data = uids[uid]
        dom.editorUid.value = uid
        dom.editorName.value = data.name
        dom.editorAge.value = data.age
        dom.dataListWrap.classList.add('editor-mode')
    }
})

dom.cancelBtn.addEventListener('click', function (e) {
    e.preventDefault()
    dom.dataListWrap.classList.remove('editor-mode')
})

dom.editorBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    if (!api) {
        alert('請先建立連線')
        return
    }

    let uid = dom.editorUid.value
    let name = dom.editorName.value
    let age = dom.editorAge.value
    if (!uid || !name || !age) {
        alert('請輸入完整資料')
        return
    }
    let response = await api.update(uid, { name, age })
    if (response.code === 200) {
        alert('更新資料成功')
        let uids = getUids()
        uids[uid] = { name, age }
        setUids(uids)
        initDataList()
        dom.dataListWrap.classList.remove('editor-mode')
    } else {
        alert(response.message)
    }
})

const getUids = function () {
    let uids = localStorage.getItem('uids')
    if (!uids) {
        uids = {}
    } else {
        uids = JSON.parse(uids)
    }
    return uids
}

const setUids = function (uids) {
    localStorage.setItem('uids', JSON.stringify(uids))
}

initDataList()
