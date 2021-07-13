const speakerData = [
	{
		img:
			'https://webdemo1.wbresearch.com/UploadedFiles/EventPage/1003574/uploads/2020-0000-zak-norm-lg.jpg',
		name: 'Zak Normandin',
		title: 'CEO/Founder',
		company: 'Dirty Lemon',
	},
	{
		img:
			'https://webdemo1.wbresearch.com/UploadedFiles/EventPage/1003574/uploads/2020-0004-sandra-campos.jpg',
		name: 'Sandra Campos',
		title: 'CEO',
		company: 'DVF',
	},
	{
		img:
			'https://webdemo1.wbresearch.com/UploadedFiles/EventPage/1003574/uploads/2020-0010-cheryl-kaplan.jpg',
		name: 'Cheryl Kaplan',
		title: 'President',
		company: 'M.Gemi',
	},
	{
		img:
			'https://webdemo1.wbresearch.com/UploadedFiles/EventPage/1003574/uploads/2020-0006-michelle-cordeiro-grant.jpg',
		name: 'Michelle Cordeiro Grant',
		title: 'Founder & CEO',
		company: 'LIVELY',
	},
	{
		img:
			'https://webdemo1.wbresearch.com/UploadedFiles/EventPage/1003574/uploads/2020-0013-alex-odell.jpg',
		name: 'Alex O’Dell',
		title: 'Founder',
		company: 'Floyd',
	},
];

const domMessages = {
	enoughSpeakers() {
		return 'You have enough speakers for featured speaker layout';
	},
	notEnough() {
		return 'Not Enough Speakers';
	},
	tooMany() {
		return 'Too Many Speakers';
	},
};

const speakerContainer = document.querySelector('.spkr-container');
const addRowButton = document.querySelector('.add-row-btn');
const instructionsCopy = document.querySelector('.instructions span');
instructionsCopy.style = "color:#ff9a69;"

let speakerRows = [];
let counter = 0;

const createSpeakerRow = function () {
	const speakerRowDiv = document.createElement('div');
	speakerRowDiv.classList.add('row', 'spkr-grid');
	speakerRowDiv.dataset.row = counter++;
	speakerContainer.appendChild(speakerRowDiv);
	//
	speakerRows.push(speakerRowDiv);
	//
	createAddSpeakerButton(speakerRowDiv);
};

const createAddSpeakerButton = function (speakerRowDiv) {
	// Button Element
	const button = document.createElement('button');
	button.classList.add('btn', 'btn-warning', 'add-spkr-btn');
	button.innerText = '+';
	speakerRowDiv.appendChild(button);
	//
	createSpeakerDivs(speakerRowDiv, button);
};

const createSpeakerDivs = function (speakerRowDiv, button) {
	let speakerDivs = [];
	//
	const speakerContainer = document.createElement('div');
	speakerContainer.classList.add('speakers-wrapper');
	speakerRowDiv.appendChild(speakerContainer);

	button.addEventListener('click', (e) => {
		const speaker = document.createElement('div');
		speaker.classList.add('spkr');
		speakerContainer.appendChild(speaker);
		//
		speakerDivs.push(speaker);
		//
		populateSpeakers(speakerDivs);
		//
		handleRadioButtonsClick(speakerRowDiv);
	});
};

const populateSpeakers = function (speakerDivs) {
	speakerDivs.forEach(function (speaker, divIndex) {
		const i = divIndex % speakerData.length;
		speaker.innerHTML = `
   <div class="radio-btn">
    <input type="radio" id="radio-${i}" name="featured" value="radio-${i}">
    <label for="radio-${i}">Featured?</label>
   </div>
   <img class="img-fluid speaker__img" src="${speakerData[`${i}`]['img']}">
  <div class="content">
    <p class="text-white">
      <span class="spkr-name">${speakerData[`${i}`]['name']}</span> <br>
      <span class="spkr-title">${speakerData[`${i}`]['title']}</span> <br>
      <span class="spkr-company"><strong>${
				speakerData[`${i}`]['company']
			}</strong></span>
    </p>
  </div>
   `;
	});
};

const handleRadioButtonsClick = function (speakerRowDiv) {
	const getRadioButtons = speakerRowDiv.querySelectorAll('[id^="radio-"]');

	getRadioButtons.forEach(function (radioBtn) {
		radioBtn.addEventListener('click', handleImages);
	});
};

const handleImages = function (e) {
	const speakerWrapper = e.target.closest('.speakers-wrapper');
	const speakerGridRow = e.target.closest('.spkr-grid');
  const speakerDivs = Array.from(speakerWrapper.children);
  const speakerDiv = e.target.closest('.spkr');

    if (speakerDivs.length === 5) {
    addFeaturedClassToImage(speakerDivs, speakerDiv);
    addFeaturedClassToRow(speakerGridRow);
    instructionsCopy.innerText = domMessages.enoughSpeakers();
  } else if (speakerDivs.length < 5) {
    instructionsCopy.innerText = domMessages.notEnough();
  } else {
    instructionsCopy.innerText = domMessages.tooMany();
  }
};

const addFeaturedClassToImage = function (speakerDivs, speakerDiv) {
  speakerDivs.forEach(function (speaker) {
    if (speaker.classList.contains('featured-spkr')) {
      speaker.classList.remove('featured-spkr');
    }
    speakerDiv.classList.add('featured-spkr');
  })
}

const addFeaturedClassToRow = function (speakerGridRow) {
  if (speakerGridRow.classList.contains('spkr-grid')) {
    speakerGridRow.classList.add('featured-row');
  }
}
addRowButton.addEventListener('click', createSpeakerRow);
