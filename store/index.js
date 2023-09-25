export const state = () => ({
	currentPage:1,
	pageSize:5,
	totalSize:10,
	blogList:[],
	typeId:'',
	recommendList:[],
	recommendCurrentPage:1,
	recommendTotalPages:0,
	recommendPageSize:4,
	archiveBlogList:[],
	archiveCurrentPage:1,
	archivePageSize:10,
	archiveTotalSize:0,
	common:'',
	Sentences:[],
	maxNumSentence:10,
	currentCountSentence:1,
	noteContent:'',
	defaultContent:'你还没有选择任何笔记噢~~',
	selectedNoteId:0,
	user:[],
	noteTOC:[],   //生成的笔记目录
	selectedNoteTOCId:0,
	blogTOC:[],	  //生成的博客目录
	selectedBlogTOCId:0,
	diaryList:[],
	diaryCurrentPage:1,
	diaryTotalSize:0,
	diaryPageSize:7,
})

export const mutations = {
	changeCurrentPage(state,newPage) {
		state.currentPage=newPage;
	},
	changePageSize(state,newPageSize) {
		state.pageSize=newPageSize;
	},
	changeTotalSize(state,newTotalSize) {
		state.totalSize=newTotalSize;
	},
	changeBlogList(state,newBlogList) {
		state.blogList=newBlogList;
	},
	changeTypeId(state,newTypeId) {
		state.typeId=newTypeId;
	},
	changeRecommendList(state,newRecommendList) {
		state.recommendList=newRecommendList;
	},
	changeRecommendCurrentPage(state,newRecommendCurrentPage) {
		state.recommendCurrentPage=newRecommendCurrentPage;
	},
	changeRecommendTotalPages(state,newRecommendTotalPaegs) {
		state.recommendTotalPages=newRecommendTotalPaegs;
	},
	changeArchiveBlogList(state,newArchiveBlogList) {
		state.archiveBlogList=newArchiveBlogList;
	},
	changeArchiveCurrentPage(state,newArchiveCurrentPage) {
		state.archiveCurrentPage=newArchiveCurrentPage;
	},
	changeArchiveTotalSize(state,newArchiveTotalSize) {
		state.archiveTotalSize=newArchiveTotalSize;
	},
	changeCommon(state,newCommon) {
		state.common=newCommon;
	},
	changeSentences(state,newSentences) {
		state.Sentences=newSentences;
	},
	changeCurrentCountSentence(state,newCurrentCountSentence) {
		state.currentCountSentence=newCurrentCountSentence;
	},
	changeNoteConent(state,newNoteContent) {
		state.noteContent=newNoteContent;
	},
	changeDefaultContent(state) {
		state.defaultContent='';
	},
	changeSelectedNoteId(state,newSelectedNoteId) {
		state.selectedNoteId=newSelectedNoteId;
	},
	changeUser(state,newUser) {
		state.user=newUser;
	},
	changeNoteTOC(state,newNoteTOC) {
		state.noteTOC=newNoteTOC;
	},
	changeSelectedNoteTOCId(state,newNoteTOCId) {
		state.selectedNoteTOCId=newNoteTOCId;
	},
	changeBlogTOC(state,newBlogTOC) {
		state.blogTOC=newBlogTOC;
	},
	changeSelectedBlogTOCId(state,newBlogTOCId) {
		state.selectedBlogTOCId=newBlogTOCId;
	},
	changeDiaryList(state,newDiaryList) {
		state.diaryList=newDiaryList;
	},
	changeDiaryCurrentPage(state,newDiaryCurrentPage) {
		state.diaryCurrentPage=newDiaryCurrentPage;
	},
	changeDiaryTotalSize(state,newDiaryTotalSize) {
		state.diaryTotalSize=newDiaryTotalSize;
	},
}
