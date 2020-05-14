// comment item
Vue.component( 'comment-item', {

	props: {
		userobj: {
			type: Object,
			required: true
		},
		commenttext: {
			type: String,
			required: true
		},
		commentdate: {
			type: String,
			required: true
		}
	},

	template: `
		<li class="media">
          <a class="pull-left" href="#">
            <img class="media-object img-circle" :src="userPicture" alt="profile">
          </a>

          <div class="media-body">
            <div class="well well-lg">
                <h4 class="media-heading text-uppercase reviews">{{ userName }} </h4>
                <ul class="media-date text-uppercase reviews list-inline">
                  <li class="aaaa">{{ commentDate }}</li>
                </ul>
                <p class="media-comment">
                  {{ comment }}
                </p>
                <a class="btn btn-info btn-circle text-uppercase" href="#" id="reply"><span class="glyphicon glyphicon-share-alt"></span> Reply</a>
            </div>              
          </div>                          
        </li>
	`,

	computed: {
		userName() {
			return this.userobj.userName
		},
		userPicture() {
			return this.userobj.userPicture
		},
		comment() {
			return this.commenttext
		},
		commentDate() {
			return this.commentdate
		}
	}

} )

// form to add a new comment
Vue.component( 'comment-form', {

	props: {
		userid: {
			type: Number,
			required: true
		}
	},

	template: `
		<div id="add-comment">
	        <form class="form-horizontal" @submit.prevent="onSubmit"> 
	            <div class="form-group">
	                <label for="email" class="col-sm-2 control-label">Comment</label>
	                <div class="col-sm-10">
	                  <textarea
	                  	v-model="comment"
	                  	class="form-control"
	                  	name="addComment"
	                  	id="addComment"
	                  	rows="5"
	                  	:class="[startValidation === 1 && !comment ? 'mx-border-red' : 'vcv']"
	                  	></textarea>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="col-sm-offset-2 col-sm-10">                    
	                    <button class="btn btn-success btn-circle text-uppercase" type="submit" id="submitComment"><span class="glyphicon glyphicon-send"></span> Summit comment</button>
	                </div>
	            </div>
	        </form>
	    </div> 
	`,

	data() {
		return {
			userId: this.userid,
			comment: null,
			date: null,

			checkErrors: [],
			errors: []
		}
	},
	methods: {
		onSubmit() {

			if( this.comment ) {

				let comment = {
					userId: this.userId,
					comment: this.comment,
					date: this.getCurrentDate()
				}

				this.$emit( 'add-comment', comment )

			} else {

				this.checkErrors.push( 'comment' )

				this.errors.push('You have to fill in a comment!')

			}
		},
		getCurrentDate() {

			let date = new Date()

			let day = date.getDate()

			let month = date.getMonth()

			let year = date.getFullYear()

			return day + '/' + month + '/' + year

		}
	},
	computed: {
		startValidation() {
			return this.checkErrors.indexOf('comment') !== -1 ? 1 : 0
		}
	}

} )

var app = new Vue( {
	el: '#app',
	data: {
		currentUserId: 2, //null
		users: [
			{
				userId: 1,
				userName: 'Nico',
				userPicture: 'https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg'
			},
			{
				userId: 2,
				userName: 'Kriztine',
				userPicture: 'https://s3.amazonaws.com/uifaces/faces/twitter/lady_katherine/128.jpg'
			},
			{
				userId: 3,
				userName: 'Marco',
				userPicture: 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg'
			},
		],
		comments: [
			{
				id: 1,
				userId: 3,
				comment: 'Great snippet! Thanks for sharing 12.',
				date: '22/9/2014'
			},
			{
				id: 2,
				userId: 2,
				comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est modi, saepe hic esse maxime quasi, sapiente ex debitis quis dolorum unde, neque quibusdam eveniet nobis enim porro repudiandae nesciunt quidem.',
				date: '23/9/2014'
			},
		]
	},
	methods: {
		getUser( userId ) {

			let user = {}

			let _this = this

			this.users.map( function( v, i ) {

				if( v.userId === userId) {
					user = _this.users[i]
				}
				
			} )

			return user

		},
		addComment( comment ) {
			comment.id = this.setNextCommentId()
			this.comments.push( comment )
			
		},
		setNextCommentId() {
			return this.comments.length + 1
		}
	}
} )