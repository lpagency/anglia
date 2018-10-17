// $ global

class TagFilters {

    constructor(...args) {
        this.filter_state = this.initTagState(args);
        this.groups = args;
        this.bindEventHandlers();
        this.callProductsHandler = debounce(this.callProductsHandler, 500);
        this.loadTagsFromURL();
    }

    callProductsHandler() {
        $('.products').trigger('FILTERS_CHANGE_EVENT');
    }

    setAPITagString() {
        let tag_strings = [];
        const filter_state = this.getTagState();

        for (let group in filter_state) {
            if (filter_state[group].length > 0) {
                tag_strings.push(`(${filter_state[group].map(t => `+${group}_${t}`).join(',')})`);
            }
        }
        $('#tag_string').val(tag_strings.join(','));
    }

    bindEventHandlers() {
        $('.custom-control-input').on('click', e => {
            this.toggleTagState(e.target.id);
            this.renderAppliedFilters(this.getTagState());
            this.callProductsHandler();
        });

        $('.applied-filters').on('click', 'i', 
        (e) => {
            $(`#${e.target.getAttribute('tag')}`).trigger('click');
        });

        $('.empty_filters').on('click',
            () => this.resetFilterState()
        );
    }

    initTagState(tag_groups) {
        const filter_state = {};
        tag_groups.forEach(g => filter_state[g] = []);
        return filter_state;
    }


    loadTagsFromURL() {
        const url = new URL(document.location.href);
        let tags = url.searchParams.get('tags');
        if (tags) {
            tags = tags.split(',');
            tags.forEach(
                t => $(`#${t}`).trigger('click')
            )
        }
    }

    toggleTagState(tagFilter) {
        const filter = tagFilter.split(/_(.+)/);
        const group = filter[0];
        const tag = filter[1];
        const groupFilter = Array.from(this.filter_state[group]);

        if (groupFilter.includes(tag)) {
            groupFilter.splice(groupFilter.indexOf(tag), 1);
        } else {
            groupFilter.push(tag);
        }

        this.filter_state[group] = groupFilter;
    }

    getTagState() {
        return JSON.parse(JSON.stringify(this.filter_state));
    }

    renderAppliedFilters(filter_state) {
        // Should be implemented abstract method
        let html = "";
        for(let group in filter_state) {
            if (filter_state[group].length > 0) {
                filter_state[group].forEach(
                    tag => {
                        html += `<button class="button button--tag" type="button">
                                    <span class="button__text">${tag.charAt(0).toUpperCase() + tag.substr(1)}</span>
                                    <i tag="${group}_${tag}" class="button__icon material-icons">close</i>
                                </button>`
                    }
                );
            }
        }

        $('.applied-filters').html(html);
        this.setAPITagString();
    }

    resetFilterState() {
        for(let group in this.filter_state) {
            this.filter_state[group].forEach(
                t => $(`#${group}_${t}`).trigger('click')
            )
        }
    }
}

const debounce = (fn, time) => {
    let timeout;
    return function() {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}

export default TagFilters;
