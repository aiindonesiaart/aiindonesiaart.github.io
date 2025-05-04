 document.addEventListener('DOMContentLoaded', function() {
            updatePanels();
        });
        
        function updatePanels() {
            const panelCount = parseInt(document.getElementById('panelCount').value);
            const tabsContainer = document.getElementById('panelTabs');
            const contentContainer = document.getElementById('panelContainer');
            
            // Clear existing tabs and content
            tabsContainer.innerHTML = '';
            contentContainer.innerHTML = '';
            
            // Create new tabs and content
            for (let i = 1; i <= panelCount; i++) {
                // Create tab
                const tab = document.createElement('li');
                tab.className = 'nav-item';
                tab.innerHTML = `
                    <a class="nav-link ${i === 1 ? 'active' : ''}" id="panel-${i}-tab" data-bs-toggle="tab" 
                       href="#panel-${i}" role="tab" aria-controls="panel-${i}">
                        Panel ${i}
                    </a>
                `;
                tabsContainer.appendChild(tab);
                
                // Create content
                const panelContent = document.createElement('div');
                panelContent.className = `tab-pane fade ${i === 1 ? 'show active' : ''}`;
                panelContent.id = `panel-${i}`;
                panelContent.role = 'tabpanel';
                panelContent.innerHTML = `
                    <div class="panel-option">
                        <div class="mb-3">
                            <label for="panel-${i}-action" class="form-label">What happens in this panel?</label>
                            <textarea class="form-control" id="panel-${i}-action" rows="2" 
                                      placeholder="Describe the action, expression, or scene change"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="panel-${i}-bubble1" class="form-label">Speech Bubble 1</label>
                            <input type="text" class="form-control" id="panel-${i}-bubble1" 
                                   placeholder="Character dialogue or thought">
                        </div>
                        <div class="mb-3">
                            <label for="panel-${i}-bubble2" class="form-label">Speech Bubble 2 (optional)</label>
                            <input type="text" class="form-control" id="panel-${i}-bubble2" 
                                   placeholder="Additional dialogue or sound effect">
                        </div>
                        <div class="mb-3">
                            <label for="panel-${i}-caption" class="form-label">Panel Caption (optional)</label>
                            <input type="text" class="form-control" id="panel-${i}-caption" 
                                   placeholder="Narration or scene description">
                        </div>
                    </div>
                `;
                contentContainer.appendChild(panelContent);
            }
        }
        
        function generatePrompt() {
            const style = document.getElementById('style').value;
            const theme = document.getElementById('theme').value;
            const characters = document.getElementById('characters').value;
            const setting = document.getElementById('setting').value;
            const overview = document.getElementById('overview').value;
            const panelCount = parseInt(document.getElementById('panelCount').value);
            
            let prompt = `Create a ${panelCount}-panel ${style} style comic in the ${theme} genre.\n\n`;
            prompt += `MAIN CHARACTERS: ${characters || 'Unspecified characters'}\n`;
            prompt += `SETTING: ${setting || 'Unspecified setting'}\n`;
            prompt += `STORY OVERVIEW: ${overview || 'No overview provided'}\n\n`;
            prompt += `PANEL DETAILS:\n`;
            
            for (let i = 1; i <= panelCount; i++) {
                const action = document.getElementById(`panel-${i}-action`).value;
                const bubble1 = document.getElementById(`panel-${i}-bubble1`).value;
                const bubble2 = document.getElementById(`panel-${i}-bubble2`).value;
                const caption = document.getElementById(`panel-${i}-caption`).value;
                
                prompt += `\nPANEL ${i}:\n`;
                prompt += `- Action: ${action || 'No action specified'}\n`;
                if (bubble1) prompt += `- Dialogue: "${bubble1}"\n`;
                if (bubble2) prompt += `- Additional text: "${bubble2}"\n`;
                if (caption) prompt += `- Caption: "${caption}"\n`;
            }
            
            prompt += `- Maintain consistent character designs throughout. Use appropriate panel layouts for the ${style} style. Ensure good flow between panels for storytelling. Make sure all texts read clearly\n`;
    
            
            document.getElementById('promptResult').textContent = prompt;
        }
        
        function copyPrompt() {
            const promptText = document.getElementById('promptResult').textContent;
            navigator.clipboard.writeText(promptText).then(() => {
                alert('Comic prompt copied to clipboard!');
            });
        }
        
        function shareOnWhatsApp() {
            const promptText = document.getElementById('promptResult').textContent;
            const encodedText = encodeURIComponent("Check out this comic prompt I created:\n\n" + promptText);
            window.open(`https://wa.me/?text=${encodedText}`);
        }
