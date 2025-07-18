import React, { useState } from 'react';
import { tv } from 'tailwind-variants';
import { CustomSlider } from '../../MUI-components/Slider';
import DeleteIcon from '../../../../assets/icons/svg/DeleteIcon.svg';

// Define component variants using tailwind-variants
const container = tv({
  base: "w-full space-y-8"
});

const section = tv({
  base: "mb-4"
});

const sectionTitle = tv({
  base: "text-2xl font-medium text-text-primary mb-1"
});

const sectionDescription = tv({
  base: "text-text-tertiary font-light text-sm mb-3"
});

const sliderContainer = tv({
  base: "flex bg-interactive rounded-full px-6 mx-auto justify-center py-2"
});

const websiteInputContainer = tv({
  base: "flex gap-3 mb-4"
});

const websiteInput = tv({
  base: "flex-1 px-2 py-1 text-sm font-normal bg-interactive duration-300 shadow-2xs rounded-lg text-text-primary placeholder-text-tertiary focus:shadow-2xl focus:duration-300 focus:outline-none border border-transparent focus:border-blue-500"
});

const addButton = tv({
  base: "px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-2xs hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
});

const websiteList = tv({
  base: "space-y-2"
});

const websiteItem = tv({
  base: "flex items-center justify-between p-3 border-b border-text-tertiary"
});

const websiteUrl = tv({
  base: "text-text-primary font-medium text-sm"
});

const deleteButton = tv({
  base: "p-1 hover:bg-interactive-hover rounded transition-colors duration-200"
});

const saveButton = tv({
  base: "w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 shadow-2xs hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
});

const BlockPreferences = () => {
  const [blockLifespan, setBlockLifespan] = useState(7);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteExceptions, setWebsiteExceptions] = useState<string[]>([]);

  const handleAddWebsite = () => {
    if (websiteUrl.trim() && !websiteExceptions.includes(websiteUrl.trim())) {
      setWebsiteExceptions(prev => [...prev, websiteUrl.trim()]);
      setWebsiteUrl('');
    }
  };

  const handleRemoveWebsite = (url: string) => {
    setWebsiteExceptions(prev => prev.filter(w => w !== url));
  };

  const handleSave = () => {
    // TODO: Save preferences to localStorage or API
    console.log('Saving preferences:', { blockLifespan, websiteExceptions });
  };

  const isFormValid = blockLifespan > 0;

  return (
    <div className="w-[90%] h-full bg-surface text-text-primary mx-auto">
      <div className={container()}>
        {/* Block Lifespan Section */}
        <div className={section()}>
          <h2 className={sectionTitle()}>Block Lifespan: {blockLifespan >= 31 ? 'Unlimited' : `${blockLifespan} ${blockLifespan === 1 ? 'day' : 'days'}`}</h2>
          <p className={sectionDescription()}>
            Select the number of days you want to block an event for.
          </p>
          <div className={sliderContainer()}>
            <CustomSlider
              value={blockLifespan}
              onChange={setBlockLifespan}
              min={1}
              max={30}
              step={1}
              label="Block lifespan in days"
              showUnlimited={true}
              unlimitedValue={31}
            />
          </div>
        </div>

        {/* Website Exceptions Section */}
        <div className={section()}>
          <h2 className={sectionTitle()}>Website Exceptions</h2>
          <p className={sectionDescription()}>
            Add the websites you want to exclude from being analyzed by SpoilerShield
          </p>
          
          <div className={websiteInputContainer()}>
            <input
              type="url"
              placeholder="https://example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className={websiteInput()}
              onKeyPress={(e) => e.key === 'Enter' && handleAddWebsite()}
            />
            <button
              onClick={handleAddWebsite}
              disabled={!websiteUrl.trim()}
              className={addButton()}
            >
              Add
            </button>
          </div>

          {/* Website List */}
          {websiteExceptions.length > 0 && (
            <div className={websiteList()}>
              {websiteExceptions.map((url, index) => (
                                 <div key={index} className={websiteItem()}>
                   <span className={websiteUrl}>{url}</span>
                  <button
                    onClick={() => handleRemoveWebsite(url)}
                    className={deleteButton()}
                    aria-label="Remove website"
                  >
                    <DeleteIcon className="w-5 h-5" fill="var(--color-text-tertiary)" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Bottom spacing for scroll */}
      <div className="h-6"></div>
    </div>
  );
};

export default BlockPreferences;